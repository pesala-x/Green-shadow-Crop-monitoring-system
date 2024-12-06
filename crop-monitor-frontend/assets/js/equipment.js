$(document).ready(function () {
  generateEquipmentID();
  loadFieldDropdown();
  loadStaffDropdown();

  // Generate Equipment ID
  function generateEquipmentID() {
    const id = "E-" + Math.floor(1000 + Math.random() * 9000);
    $("#equipmentId").val(id);
  }

  // Load Staff Dropdown
  function loadStaffDropdown() {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/staff/allstaff",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (staffList) {
        staffList.forEach((staff) => {
          $("#assignedStaff").append(
            `<option value="${staff.id}">${staff.id} - ${staff.firstName} ${staff.lastName}</option>`
          );
        });
      },
      error: function () {
        alert("Failed to load staff data.");
      },
    });
  }

  // Load Field Dropdown
  function loadFieldDropdown() {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/fields/allFields",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (fieldList) {
        fieldList.forEach((field) => {
          $("#assignedField").append(
            `<option value="${field.fieldCode}">${field.fieldCode} - ${field.fieldName}</option>`
          );
        });
      },
      error: function () {
        alert("Failed to load field data.");
      },
    });
  }

  // Function to validate equipment inputs with SweetAlert popups
  function validateEquipmentInputs() {
    const equipmentNameInput = $("#equipmentName");
    const equipmentTypeInput = $("#equipmentType");
    const statusInput = $("#status");
    const assignedStaffInput = $("#assignedStaff");
    const assignedFieldInput = $("#assignedField");

    const equipmentName = equipmentNameInput.val();
    const equipmentType = equipmentTypeInput.val();
    const status = statusInput.val();
    const assignedStaff = assignedStaffInput.val();
    const assignedField = assignedFieldInput.val();

    // Validate equipment name
    if (!equipmentName) {
      showValidationError("Invalid Input", "Equipment Name cannot be empty.");
      return false;
    }

    // Validate equipment type
    if (!equipmentType) {
      showValidationError("Invalid Input", "Please select an Equipment Type.");
      return false;
    }

    // Validate equipment status
    if (!status) {
      showValidationError(
        "Invalid Input",
        "Please select an Equipment Status."
      );
      return false;
    }

    // Validate assigned staff
    if (!assignedStaff) {
      showValidationError("Invalid Input", "Please select Assigned Staff.");
      return false;
    }

    // Validate assigned field
    if (!assignedField) {
      showValidationError("Invalid Input", "Please select Assigned Field.");
      return false;
    }

    return true;
  }

  function showValidationError(title, text) {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }

  function showPopup(type, title, text, confirmCallback = null) {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      showCancelButton: !!confirmCallback,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed && confirmCallback) {
        confirmCallback();
      }
    });
  }

  // Save Equipment
  $("#equipmentForm").on("submit", function (e) {
    e.preventDefault();

    if (!validateEquipmentInputs()) {
      return;
    }

    let formData = new FormData(this);
    formData.append("equipmentId", $("#equipmentId").val());
    formData.append("equipmentName", $("#equipmentName").val());
    formData.append("equipmentType", $("#equipmentType").val());
    formData.append("equipmentStatus", $("#status").val());
    formData.append("fieldCode", $("#assignedField").val());
    formData.append("id", $("#assignedStaff").val());

    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/equipment",
      type: "POST",
      data: JSON.stringify(Object.fromEntries(formData)),
      contentType: "application/json",
      processData: false,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (response) {
        Swal.fire(
          "Save Successfully!",
          "Equipment has been saved successfully.",
          "success"
        );
        $("#equipmentForm")[0].reset();
        generateEquipmentID();
      },

      error: function (xhr) {
        if (xhr.status === 401) {
          Swal.fire(
            "Session Expired",
            "Your session has expired. Please log in again.",
            "warning"
          ).then(() => {
            window.location.href = "/index.html";
          });
        } else if (xhr.status === 403) {
          Swal.fire(
            "Permission Denied",
            "You do not have permission to perform this action.",
            "error"
          );
        } else {
          Swal.fire(
            "Error",
            xhr.responseText || "An unexpected error occurred.",
            "error"
          );
        }
      },
    });
  });

  // Get All Equipment
  $("#getAllBtn").on("click", function () {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/equipment/allEquipment",
      type: "GET",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (data) {
        let tableBody = $("#equipmentTableBody");
        tableBody.empty();
        data.forEach((equipment) => {
          tableBody.append(`
          <tr>
            <td>${equipment.equipmentId}</td>
            <td>${equipment.equipmentName}</td>
            <td>${equipment.equipmentType}</td>
            <td>${equipment.equipmentStatus}</td>
            <td>${equipment.id}</td>
            <td>${equipment.fieldCode}</td>
          </tr>
        `);
        });
        $("#equipmentListModal").modal("show");
      },

      error: function (xhr) {
        if (xhr.status === 401) {
          showPopup(
            "warning",
            "Session Expired",
            "Your session has expired. Please log in again.",
            () => {
              window.location.href = "/index.html";
            }
          );
        } else {
          showPopup(
            "error",
            "Error",
            xhr.responseText || "An unexpected error occurred."
          );
        }
      },
    });
  });

  // Search Equipment
  $("#searchIcon").on("click", function () {
    searchAndFillEquipmentForm();
  });

  $("#searchEquipment").on("keypress", function (e) {
    if (e.which == 13) {
      searchAndFillEquipmentForm();
    }
  });

  function searchAndFillEquipmentForm() {
    const searchTerm = $("#searchEquipment").val().trim();
    if (searchTerm === "") {
      showPopup(
        "warning",
        "Not Found",
        "Please enter a equipment code or name to search."
      );
      return;
    }

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/equipment?searchTerm=${encodeURIComponent(
        searchTerm
      )}`,
      type: "GET",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (data) {
        if (data.length === 0) {
          showPopup(
            "warning",
            "Not Found",
            "Equipment code not found. Please try again!."
          );
          return;
        }

        const equipment = data[0];
        $("#equipmentId").val(equipment.equipmentId);
        $("#equipmentName").val(equipment.equipmentName);
        $("#equipmentType").val(equipment.equipmentType).change();
        $("#status").val(equipment.equipmentStatus).change();
        $("#assignedField").val(equipment.fieldCode).change();
        $("#assignedStaff").val(equipment.id).change();
      },

      error: function (xhr) {
        if (xhr.status === 401) {
          showPopup(
            "warning",
            "Session Expired",
            "Your session has expired. Please log in again.",
            () => {
              window.location.href = "/index.html";
            }
          );
        } else {
          showPopup(
            "error",
            "Error",
            xhr.responseText || "An unexpected error occurred."
          );
        }
      },
    });
  }

  // Update Equipment
  $("#updateBtn").click(function () {
    if (!validateEquipmentInputs()) {
      return;
    }
    const equipmentId = $("#equipmentId").val();

    let formData = {
      equipmentName: $("#equipmentName").val(),
      equipmentType: $("#equipmentType").val(),
      equipmentStatus: $("#status").val(),
      fieldCode: $("#assignedField").val(),
      id: $("#assignedStaff").val(),
    };

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/equipment/${equipmentId}`,
      type: "PATCH",
      data: JSON.stringify(formData),
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function () {
        Swal.fire(
          "Update Successfully!",
          "Equipment has been updated successfully.",
          "success"
        );
        clearForm();
      },

      error: function (xhr) {
        if (xhr.status === 401) {
          showPopup(
            "warning",
            "Session Expired",
            "Your session has expired. Please log in again.",
            () => {
              window.location.href = "/index.html";
            }
          );
        } else if (xhr.status === 403) {
          showPopup(
            "error",
            "Permission Denied",
            "You do not have permission to perform this action."
          );
        } else {
          showPopup(
            "error",
            "Error",
            xhr.responseText || "An unexpected error occurred."
          );
        }
      },
    });
  });

  // Delete Equipment
  $("#deleteBtn").click(function () {
    const equipmentId = $("#equipmentId").val();

    if (!equipmentId) return;
    showPopup(
      "warning",
      "Not Found",
      "Please enter a equipment code id to delete."
    );
    showPopup(
      "warning",
      "Confirm Delete",
      "Are you sure you want to delete this equipment?",
      () => {
        $.ajax({
          url: `http://localhost:5050/crop-monitor/api/v1/equipment/${equipmentId}`,
          type: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          success: function () {
            Swal.fire(
              "Delete Successfully!",
              "Equipment has been deleted successfully.",
              "success"
            );
            clearForm();
          },

          error: function (xhr) {
            if (xhr.status === 401) {
              showPopup(
                "warning",
                "Session Expired",
                "Your session has expired. Please log in again.",
                () => {
                  window.location.href = "/index.html";
                }
              );
            } else if (xhr.status === 403) {
              showPopup(
                "error",
                "Permission Denied",
                "You do not have permission to perform this action."
              );
            } else {
              showPopup(
                "error",
                "Error",
                xhr.responseText || "An unexpected error occurred."
              );
            }
          },
        });
      }
    );
  });

  // Clear form
  $(document).ready(function () {
    generateEquipmentID();

    $("#clearBtn").on("click", function () {
      generateEquipmentID();

      $("#equipmentForm")
        .find("input, select, textarea")
        .not("#equipmentId")
        .val("")
        .trigger("change");
    });
  });
});
