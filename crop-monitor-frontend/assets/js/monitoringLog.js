// Generate Monitoring Log Code
function generateLogCode() {
  const code = "L-" + Math.floor(1000 + Math.random() * 900);
  $("#logCode").val(code);
}

$(document).ready(function () {
  generateLogCode();
  loadFields();
  loadCrops();
  loadStaff();

  // Load fields into dropdown
  function loadFields() {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/fields/allFields",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (fields) {
        $("#fieldSelect")
          .empty()
          .append("<option disabled selected>Select Field</option>");
        fields.forEach((field) => {
          $("#fieldSelect").append(
            new Option(
              `${field.fieldCode} - ${field.fieldName}`,
              field.fieldCode
            )
          );
        });
      },
      error: function () {
        alert("Failed to load fields.");
      },
    });
  }

  // Load crops into dropdown
  function loadCrops() {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/crops/allcrops",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (crops) {
        $("#cropSelect")
          .empty()
          .append("<option disabled selected>Select Crop</option>");
        crops.forEach((crop) => {
          $("#cropSelect").append(
            new Option(
              `${crop.cropCode} - ${crop.cropCommonName}`,
              crop.cropCode
            )
          );
        });
      },
      error: function () {
        alert("Failed to load crops.");
      },
    });
  }

  // Load staff into dropdown
  function loadStaff() {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/staff/allstaff",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (staffList) {
        $("#staffSelect")
          .empty()
          .append("<option disabled selected>Select Staff</option>");
        staffList.forEach((staff) => {
          $("#staffSelect").append(
            new Option(`${staff.id} - ${staff.firstName}`, staff.id)
          );
        });
      },
      error: function () {
        alert("Failed to load staff.");
      },
    });
  }

  // Utility function to check if the first letter is capitalized
  function isFirstLetterCapitalized(text) {
    return /^[A-Z]/.test(text);
  }

  // Function to validate Monitoring Log inputs with SweetAlert popups
  function validateMonitoringLogInputs() {
    const logDateInput = $("#logDate");
    const logDetailsInput = $("#logDetails");
    const fieldSelectInput = $("#fieldSelect");
    const cropSelectInput = $("#cropSelect");
    const staffSelectInput = $("#staffSelect");

    const logDate = logDateInput.val();
    const logDetails = logDetailsInput.val().trim();
    const field = fieldSelectInput.val();
    const crop = cropSelectInput.val();
    const staff = staffSelectInput.val();

    if (!logDate) {
      showValidationError("Invalid Input", "Log Date cannot be empty.");
      return false;
    }

    if (!logDetails) {
      showValidationError("Invalid Input", "Log Details cannot be empty.");
      return false;
    }
    if (!isFirstLetterCapitalized(logDetails)) {
      showValidationError(
        "Invalid Input",
        "Log Details must start with a capital letter."
      );
      return false;
    }

    if (!field) {
      showValidationError("Invalid Input", "Please select a field.");
      return false;
    }

    if (!crop) {
      showValidationError("Invalid Input", "Please select a crop.");
      return false;
    }

    if (!staff) {
      showValidationError("Invalid Input", "Please select a staff member.");
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

  // Save Monitoring Log
  $("#monitoringLogForm").on("submit", function (e) {
    e.preventDefault();
    if (!validateMonitoringLogInputs()) {
      return;
    }
    let formData = new FormData(this);
    formData.append("logCode", $("#logCode").val());
    formData.append("logDate", $("#logDate").val());
    formData.append("observation", $("#logDetails").val());
    formData.append("logImage", $("#observedImage")[0].files[0]);
    formData.append("fieldCode", $("#fieldSelect").val());
    formData.append("cropCode", $("#cropSelect").val());
    formData.append("staffId", $("#staffSelect").val());

    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/monitoringLog",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function () {
        Swal.fire(
          "Save Successfully!",
          "Monitoring log has been saved successfully.",
          "success"
        );
        $("#monitoringLogForm")[0].reset();
        generateLogCode();
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

  // Get All Monitoring Logs
  $("#getAllLogsBtn").on("click", function () {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/monitoringLog/allLogs",
      type: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (logs) {
        let tableBody = $("#logTableBody");
        tableBody.empty();
        logs.forEach((log) => {
          tableBody.append(`
              <tr>
                <td>${log.log_code}</td>
                <td>${log.log_date}</td>
                <td>${log.observation}</td>
                <td>${log.fieldCode}</td>
                <td>${log.cropCode}</td>
                <td>${log.id}</td>
                <td><img src="data:image/png;base64,${log.log_image}" style="max-height: 50px;"></td>
              </tr>
            `);
        });
        $("#logListModal").modal("show");
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

  // Search Monitoring Log
  $("#searchIcon").on("click", searchAndFillLogForm);
  $("#searchLog").on("keypress", function (e) {
    if (e.which === 13) searchAndFillLogForm();
  });

  function searchAndFillLogForm() {
    const searchTerm = $("#searchLog").val().trim();
    if (searchTerm === "") {
      showPopup("warning", "Not Found", "Please enter a log code or date ");
      return;
    }

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/monitoringLog?searchTerm=${encodeURIComponent(
        searchTerm
      )}`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (logs) {
        if (logs.length === 0) {
          showPopup(
            "warning",
            "Not Found",
            "Log not found. Please try again!. "
          );
          return;
        }

        const log = logs[0];
        $("#logCode").val(log.log_code);
        $("#logDate").val(log.log_date);
        $("#logDetails").val(log.observation);
        $("#fieldSelect").val(log.fieldCode).change();
        $("#cropSelect").val(log.cropCode).change();
        $("#staffSelect").val(log.id).change();

        if (log.log_image) {
          $("#previewObservedImage")
            .attr("src", `data:image/png;base64,${log.log_image}`)
            .show();
        } else {
          $("#previewObservedImage").hide();
        }
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

  // Update Monitoring Log
  $("#updateLogBtn").on("click", function () {
    if (!validateMonitoringLogInputs()) {
      return;
    }
    let formData = new FormData();
    formData.append("logDate", $("#logDate").val());
    formData.append("observation", $("#logDetails").val());
    formData.append("fieldCode", $("#fieldSelect").val());
    formData.append("cropCode", $("#cropSelect").val());
    formData.append("staffId", $("#staffSelect").val());
    if ($("#observedImage")[0].files[0]) {
      formData.append("logImage", $("#observedImage")[0].files[0]);
    }

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/monitoringLog/${$(
        "#logCode"
      ).val()}`,
      type: "PATCH",
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function () {
        Swal.fire(
          "Update Successfully!",
          "Monitoring log has been updated successfully.",
          "success"
        );
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

  // Delete Monitoring Log
  $("#deleteLogBtn").on("click", function () {
    const logCode = $("#logCode").val();
    showPopup(
      "warning",
      "Confirm Delete",
      "Are you sure you want to delete this Monitoring Log?",
      () => {
        $.ajax({
          url: `http://localhost:5050/crop-monitor/api/v1/monitoringLog/${logCode}`,
          type: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          success: function () {
            Swal.fire(
              "Delete Successfully!",
              "Monitoring Log has been deleted successfully.",
              "success"
            );
            $("#logForm")[0].reset();
            generateLogCode();
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

  // Clear Monitoring Log Form
  $("#clearLogBtn").on("click", function () {
    $("#monitoringLogForm")[0].reset();
    generateLogCode();
    $("#previewObservedImage").hide();
  });
});
