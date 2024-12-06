$(document).ready(function () {
  $("#crops").select2({
    placeholder: "Select crops",
    allowClear: true,
    closeOnSelect: false,
    width: "100%",
  });
});

// field code genarate

function generateFieldCode() {
  const code = "F-" + Math.floor(1000 + Math.random() * 900);
  document.getElementById("fieldCode").value = code;
}

function isFirstLetterCapitalized(text) {
  return /^[A-Z]/.test(text);
}

// Validation function
function validateInputsWithPopup() {
  const fieldNameInput = document.getElementById("fieldName");
  const fieldLocationInput = document.getElementById("fieldLocation");
  const fieldSizeInput = document.getElementById("fieldSize");

  const fieldName = fieldNameInput.value.trim();
  const fieldLocation = fieldLocationInput.value.trim();
  const fieldSize = fieldSizeInput.value.trim();

  if (!fieldName) {
    showValidationError("Invalid Input", "Field Name cannot be empty.");
    return false;
  }

  if (!isFirstLetterCapitalized(fieldName)) {
    showValidationError(
      "Invalid Input",
      "Field Name must start with a capital letter."
    );
    return false;
  }

  if (!fieldLocation) {
    showValidationError("Invalid Input", "Field Location cannot be empty.");
    return false;
  }

  if (!fieldSize) {
    showValidationError("Invalid Input", "Field Size cannot be empty.");
    return false;
  }

  if (!isFirstLetterCapitalized(fieldLocation)) {
    showValidationError(
      "Invalid Input",
      "Field Location must start with a capital letter."
    );
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

// Save Field
$("#fieldForm").on("submit", function (e) {
  e.preventDefault();

  if (!validateInputsWithPopup()) {
    return;
  }

  let formData = new FormData(this);
  formData.append("fieldCode", $("#fieldCode").val());
  formData.append("fieldName", $("#fieldName").val());
  formData.append("fieldLocation", $("#fieldLocation").val());
  formData.append("extentSize", $("#fieldSize").val());
  formData.append("fieldImage1", $("#fieldImage1")[0].files[0]);
  formData.append("fieldImage2", $("#fieldImage2")[0].files[0]);

  $.ajax({
    url: "http://localhost:5050/crop-monitor/api/v1/fields",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    success: function (response) {
      Swal.fire(
        "Save Successfully!",
        "Field has been saved successfully.",
        "success"
      );
      $("#fieldForm")[0].reset();
      generateFieldCode();
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

// Get All Fields
$("#getAllBtn").on("click", function () {
  $.ajax({
    url: "http://localhost:5050/crop-monitor/api/v1/fields/allFields",
    type: "GET",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    success: function (data) {
      let tableBody = $("#fieldTableBody");
      tableBody.empty();
      data.forEach((field) => {
        tableBody.append(`
                  <tr>
                      <td>${field.fieldCode}</td>
                      <td>${field.fieldName}</td>
                      <td>${field.fieldLocation}</td>
                      <td>${field.extentSize}</td>
                      <td><img src="data:image/png;base64,${field.fieldImage1}" alt="Image 1" style="max-height: 50px;"></td>
                      <td><img src="data:image/png;base64,${field.fieldImage2}" alt="Image 2" style="max-height: 50px;"></td>
                  </tr>
              `);
      });
      // Sort
      if ($.fn.DataTable.isDataTable("#fieldList table")) {
        $("#fieldList table").DataTable().destroy();
      }
      $("#fieldList table").DataTable({
        paging: true,
        searching: true,
        ordering: true,
        order: [[0, "asc"]],
      });
      $("#fieldList table").DataTable();
      $("#fieldListModal").modal("show");
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

// Clear Field
$(document).ready(function () {
  generateFieldCode();

  $("#clearBtn").on("click", function () {
    generateFieldCode();

    $("#fieldForm")
      .find("input, select")
      .not("#fieldCode")
      .val("")
      .trigger("change");

    $("#previewImage1, #previewImage2").hide();
  });
});

// Update Field
$("#updateBtn").on("click", function () {
  if (!validateInputsWithPopup()) {
    return;
  }
  let formData = new FormData();
  formData.append("fieldName", $("#fieldName").val());
  formData.append("fieldLocation", $("#fieldLocation").val());
  formData.append("extentSize", $("#fieldSize").val());
  if ($("#fieldImage1")[0].files[0]) {
    formData.append("fieldImage1", $("#fieldImage1")[0].files[0]);
  }
  if ($("#fieldImage2")[0].files[0]) {
    formData.append("fieldImage2", $("#fieldImage2")[0].files[0]);
  }

  $.ajax({
    url: `http://localhost:5050/crop-monitor/api/v1/fields/${$(
      "#fieldCode"
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
        "Field has been updated successfully.",
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

// Delete Field
$("#deleteBtn").on("click", function () {
  const fieldCode = $("#fieldCode").val();
  showPopup(
    "warning",
    "Confirm Delete",
    "Are you sure you want to delete this field?",
    () => {
      $.ajax({
        url: `http://localhost:5050/crop-monitor/api/v1/fields/${fieldCode}`,
        type: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        success: function () {
          Swal.fire(
            "Delete Successfully!",
            "Field has been deleted successfully.",
            "success"
          );
          $("#fieldForm")[0].reset();
          generateFieldCode();
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

// Search Field
$(document).ready(function () {
  $("#searchField").on("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  });

  $("#searchIcon").on("click", function () {
    performSearch();
  });

  function performSearch() {
    const searchTerm = $("#searchField").val().trim();
    if (!searchTerm) {
      showPopup(
        "warning",
        "Not Found",
        "Please enter a field code or name to search."
      );
      return;
    }

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/fields?searchTerm=${encodeURIComponent(
        searchTerm
      )}`,
      type: "GET",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (data) {
        if (data.length > 0) {
          const field = data[0];
          $("#fieldCode").val(field.fieldCode);
          $("#fieldName").val(field.fieldName);
          $("#fieldLocation").val(field.fieldLocation);
          $("#fieldSize").val(field.extentSize);

          if (field.fieldImage1) {
            $("#previewImage1")
              .attr("src", `data:image/png;base64,${field.fieldImage1}`)
              .show();
          } else {
            $("#previewImage1").hide();
          }

          if (field.fieldImage2) {
            $("#previewImage2")
              .attr("src", `data:image/png;base64,${field.fieldImage2}`)
              .show();
          } else {
            $("#previewImage2").hide();
          }
        } else {
          showPopup(
            "error",
            "Not Found",
            "Field not found. Please try again!."
          );
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
});

$(document).ready(function () {
  $("#assigment").click(function () {
    window.location.href = "fieldStaffAssign.html";
  });
});
