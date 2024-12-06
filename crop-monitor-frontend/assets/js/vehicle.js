$(document).ready(function () {
  // Vehicle code generation
  function generateVehicleCode() {
    const code = "V-" + Math.floor(1000 + Math.random() * 900);
    $("#vehicleCode").val(code);
  }
  generateVehicleCode();

  // Utility function to check if the first letter is capitalized
  function isFirstLetterCapitalized(text) {
    return /^[A-Z]/.test(text);
  }

  // Function to validate vehicle inputs with SweetAlert popups
  function validateVehicleInputs() {
    const vehicleCodeInput = $("#vehicleCode");
    const licensePlateInput = $("#licensePlate");
    const vehicleCategoryInput = $("#vehicleCategory");
    const fuelTypeInput = $("#fuelType");
    const statusInput = $("#status");

    const vehicleCode = vehicleCodeInput.val().trim();
    const licensePlate = licensePlateInput.val().trim();
    const vehicleCategory = vehicleCategoryInput.val();
    const fuelType = fuelTypeInput.val();
    const status = statusInput.val();

    // Validate vehicle code
    if (!vehicleCode) {
      showValidationError("Invalid Input", "Vehicle Code cannot be empty.");
      return false;
    }

    // Validate license plate
    if (!licensePlate) {
      showValidationError("Invalid Input", "License Plate cannot be empty.");
      return false;
    }
    if (!isFirstLetterCapitalized(licensePlate)) {
      showValidationError(
        "Invalid Input",
        "License Plate must start with a capital letter."
      );
      return false;
    }

    // Validate vehicle category
    if (!vehicleCategory) {
      showValidationError(
        "Invalid Input",
        "Please select a valid vehicle category."
      );
      return false;
    }

    // Validate fuel type
    if (!fuelType) {
      showValidationError("Invalid Input", "Please select a fuel type.");
      return false;
    }

    // Validate status
    if (!status) {
      showValidationError("Invalid Input", "Please select a status.");
      return false;
    }

    return true;
  }

  // Show validation error using SweetAlert
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

  // save vehicle
  $("#vehicleForm").on("submit", function (e) {
    e.preventDefault();

    if (!validateVehicleInputs()) {
      return;
    }

    let formData = new FormData(this);
    formData.append("vehicleCode", $("#vehicleCode").val());
    formData.append("licensePlateNumber", $("#licensePlate").val());
    formData.append("vehicleCategory", $("#vehicleCategory").val());
    formData.append("fuelType", $("#fuelType").val());
    formData.append("status", $("#status").val());
    formData.append("remarks", $("#remarks").val());

    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/vehicles",
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
          "Vehicle has been saved successfully.",
          "success"
        );
        $("#vehicleForm")[0].reset();
        generateVehicleCode();
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

  // search vehicle
  $("#searchIcon").on("click", function () {
    searchAndFillVehicleForm();
  });

  $("#searchVehicle").on("keypress", function (e) {
    if (e.which == 13) {
      searchAndFillVehicleForm();
    }
  });

  function searchAndFillVehicleForm() {
    const searchTerm = $("#searchVehicle").val().trim();
    if (searchTerm === "") {
      showPopup(
        "warning",
        "Not Found",
        "Please enter a Vehicle code or License Plate to search."
      );
      return;
    }

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/vehicles?searchTerm=${encodeURIComponent(
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
            "error",
            "Not Found",
            "vehicle not found. Please try again!."
          );
          return;
        }

        const vehicle = data[0];
        $("#vehicleCode").val(vehicle.vehicleCode);
        $("#licensePlate").val(vehicle.licensePlateNumber);
        $("#vehicleCategory").val(vehicle.vehicleCategory).change();
        $("#fuelType").val(vehicle.fuelType).change();
        $("#status").val(vehicle.status).change();
        $("#remarks").val(vehicle.remarks);
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

  // Update vehicle
  $("#updateBtn").click(function () {
    if (!validateVehicleInputs()) {
      return;
    }
    const vehicleCode = $("#vehicleCode").val();
    let formData = {
      licensePlateNumber: $("#licensePlate").val(),
      vehicleCategory: $("#vehicleCategory").val(),
      fuelType: $("#fuelType").val(),
      status: $("#status").val(),
      remarks: $("#remarks").val(),
    };

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/vehicles/${vehicleCode}`,
      type: "PATCH",
      data: JSON.stringify(formData),
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function () {
        // alert("Vehicle updated successfully!");
        Swal.fire(
          "Update Successfully!",
          "Vehicle has been updated successfully.",
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

  // Delete vehicle
  $("#deleteBtn").click(function () {
    const vehicleCode = $("#vehicleCode").val();
    showPopup(
      "warning",
      "Confirm Delete",
      "Are you sure you want to delete this field?",
      () => {
        $.ajax({
          url: `http://localhost:5050/crop-monitor/api/v1/vehicles/${vehicleCode}`,
          type: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },

          success: function () {
            Swal.fire(
              "Delete Successfully!",
              "Vehicle has been deleted successfully.",
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

  // Get all vehicles
  $("#getAllBtn").click(function () {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/vehicles/allVehicles",
      type: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (vehicles) {
        let vehicleRows = "";
        vehicles.forEach((vehicle) => {
          vehicleRows += `
            <tr>
              <td>${vehicle.vehicleCode}</td>
              <td>${vehicle.licensePlateNumber}</td>
              <td>${vehicle.vehicleCategory}</td>
              <td>${vehicle.fuelType}</td>
              <td>${vehicle.status}</td>
              <td>${vehicle.remarks}</td>
            </tr>
          `;
        });
        $("#vehicleTableBody").html(vehicleRows);

        // Sort
        if ($.fn.DataTable.isDataTable("#cropTable")) {
          $("#cropTable").DataTable().destroy();
        }
        $("#cropTable").DataTable({
          paging: true,
          searching: true,
          ordering: true,
          order: [[0, "asc"]],
        });
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

  // Clear form
  $(document).ready(function () {
    generateVehicleCode();

    $("#clearBtn").on("click", function () {
      generateVehicleCode();

      $("#vehicleForm")
        .find("input, select, textarea")
        .not("#vehicleCode")
        .val("")
        .trigger("change");
    });
  });
});
