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

  // Save Equipment
  $("#equipmentForm").on("submit", function (e) {
    e.preventDefault();

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
      success: function (response) {
        alert("Equipment saved successfully!");
        $("#equipmentForm")[0].reset();
        //
      },
      error: function (xhr, status, error) {
        alert("Error saving equipment: " + xhr.responseJSON.message);
      },
    });
  });

  // Get All Equipment
  $("#getAllBtn").on("click", function () {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/equipment/allEquipment",
      type: "GET",
      contentType: "application/json",
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
      error: function () {
        alert("Error retrieving equipment list.");
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
    alert("Please enter an equipment code or name.");
    return;
  }

  $.ajax({
    url: `http://localhost:5050/crop-monitor/api/v1/equipment?searchTerm=${encodeURIComponent(
      searchTerm
    )}`,
    type: "GET",
    contentType: "application/json",
    success: function (data) {
      if (data.length === 0) {
        alert("No matching equipment found.");
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
    error: function (xhr, status, error) {
      alert("Error retrieving equipment data: " + xhr.responseJSON.message);
    },
  });
}

  // Update Equipment
  $("#updateBtn").click(function () {
    const equipmentId = $("#equipmentId").val();
    if (!equipmentId) return alert("Please enter Equipment Id to update.");

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
      success: function () {
        alert("Equipment updated successfully!");
        clearForm();
      },
      error: function (xhr) {
        alert("Failed to update Equipment: " + xhr.responseText);
      },
    });
  });

// Delete Equipment
$("#deleteBtn").click(function () {
  const equipmentId = $("#equipmentId").val();
  if (!equipmentId) return alert("Please enter Equipment Id to delete.");

  $.ajax({
    url: `http://localhost:5050/crop-monitor/api/v1/equipment/${equipmentId}`,
    type: "DELETE",
    success: function () {
      alert("Equipment deleted successfully!");
      clearForm();
    },
    error: function (xhr) {
      alert("Failed to delete Equipment: " + xhr.responseText);
    },
  });
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
