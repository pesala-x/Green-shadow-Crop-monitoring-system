// generate crop code
function generateCropCode() {
  const code = "C-" + Math.floor(1000 + Math.random() * 900);
  $("#cropCode").val(code);
}

$(document).ready(function () {
  generateCropCode();
  loadFields();

  // Load field to crop dropdown
  function loadFields() {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/fields/allFields", // Endpoint to fetch fields
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (fields) {
        $("#field")
          .empty()
          .append("<option disabled selected>Select Field</option>");

        fields.forEach((field) => {
          $("#field").append(
            new Option(
              `${field.fieldCode} - ${field.fieldName}`,
              field.fieldCode
            )
          );
        });
      },
      error: function (xhr) {
        console.error("Failed to load fields:", xhr.responseText);
      },
    });
  }

  // Utility function to check if the first letter is capitalized
  function isFirstLetterCapitalized(text) {
    return /^[A-Z]/.test(text);
  }

  // Function to validate inputs with SweetAlert popups
  function validateCropInputs() {
    const cropCommonNameInput = $("#cropCommonName");
    const cropScientificNameInput = $("#cropScientificName");
    const cropCategoryInput = $("#cropCategory");
    const cropSeasonInput = $("#cropSeason");
    const fieldInput = $("#field");

    const cropCommonName = cropCommonNameInput.val().trim();
    const cropScientificName = cropScientificNameInput.val().trim();
    const cropCategory = cropCategoryInput.val();
    const cropSeason = cropSeasonInput.val();
    const field = fieldInput.val();

    // Validate crop common name
    if (!cropCommonName) {
      showValidationError("Invalid Input", "Crop Common Name cannot be empty.");
      return false;
    }
    if (!isFirstLetterCapitalized(cropCommonName)) {
      showValidationError(
        "Invalid Input",
        "Crop Common Name must start with a capital letter."
      );
      return false;
    }

    // Validate crop scientific name
    if (!cropScientificName) {
      showValidationError(
        "Invalid Input",
        "Crop Scientific Name cannot be empty."
      );
      return false;
    }
    if (!isFirstLetterCapitalized(cropScientificName)) {
      showValidationError(
        "Invalid Input",
        "Crop Scientific Name must start with a capital letter."
      );
      return false;
    }

    // Validate category
    if (!cropCategory) {
      showValidationError("Invalid Input", "Please select a category.");
      return false;
    }

    // Validate season
    if (!cropSeason) {
      showValidationError("Invalid Input", "Please select a crop season.");
      return false;
    }

    // Validate field
    if (!field) {
      showValidationError("Invalid Input", "Please select a field.");
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

  // Save Crop
  $("#cropForm").on("submit", function (e) {
    e.preventDefault();

    if (!validateCropInputs()) {
      return;
    }

    let formData = new FormData(this);
    formData.append("cropCode", $("#cropCode").val());
    formData.append("cropCommonName", $("#cropCommonName").val());
    formData.append("cropScientificName", $("#cropScientificName").val());
    formData.append("category", $("#cropCategory").val());
    formData.append("cropSeason", $("#cropSeason").val());
    formData.append("fieldCode", $("#field").val());
    formData.append("cropImage", $("#cropImage")[0].files[0]);

    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/crops",
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
          "Crop has been saved successfully.",
          "success"
        );
        $("#cropForm")[0].reset();
        generateCropCode();
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

    // Get All Crops
    $("#getAllBtn").on("click", function () {
      $.ajax({
        url: "http://localhost:5050/crop-monitor/api/v1/crops/allcrops",
        type: "GET",
        contentType: "application/json",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        success: function (data) {
          let tableBody = $("#cropTableBody");
          tableBody.empty();
          data.forEach((crop) => {
            tableBody.append(`
            <tr>
              <td>${crop.cropCode}</td>
              <td>${crop.cropCommonName}</td>
              <td>${crop.cropScientificName}</td>
              <td>${crop.category}</td>
              <td>${crop.cropSeason}</td>
              <td>${crop.fieldCode}</td>
              <td><img src="data:image/png;base64,${crop.cropImage}" alt="Crop Image" style="max-height: 50px;"></td>
            </tr>
          `);
          });

          // Sort
          if ($.fn.DataTable.isDataTable("#cropList table")) {
            $("#cropList table").DataTable().destroy();
          }
          $("#cropList table").DataTable({
            paging: true,
            searching: true,
            ordering: true,
            order: [[0, "asc"]],
          });
          $("#cropList table").DataTable();
          $("#cropListModal").modal("show");
        },

        error: function (xhr) {
          if (xhr.status === 401)
            if (confirm("Session expired. Please log in again.")) {
              // Handle session expiration
              window.location.href = "/index.html";
            } else {
              // Handle other errors
              alert(
                "Error retrieving field list : " +
                  (xhr.responseText || "An unexpected error occurred.")
              );
            }
        },
      });
    });

  // search crop
  $("#searchIcon").on("click", function () {
    searchAndFillCropForm();
  });

  $("#searchCrop").on("keypress", function (e) {
    if (e.which == 13) {
      searchAndFillCropForm();
    }
  });

  function searchAndFillCropForm() {
    const searchTerm = $("#searchCrop").val().trim();
    if (searchTerm === "") {
      showPopup(
        "warning",
        "Not Found",
        "Please enter a crop code or common name to search."
      );
      return;
    }

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/crops?searchTerm=${encodeURIComponent(
        searchTerm
      )}`,
      type: "GET",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (data) {
        if (data.length === 0) {
          // alert("No matching crop found.");
          showPopup("error", "Not Found", "Crop not found. Please try again!.");
          return;
        }

        const crop = data[0];
        $("#cropCode").val(crop.cropCode);
        $("#cropCommonName").val(crop.cropCommonName);
        $("#cropScientificName").val(crop.cropScientificName);
        $("#cropCategory").val(crop.category).change();
        $("#cropSeason").val(crop.cropSeason).change();
        $("#field").val(crop.fieldCode).change();

        if (crop.cropImage) {
          $("#previewCropImage")
            .attr("src", `data:image/png;base64,${crop.cropImage}`)
            .show();
        } else {
          $("#previewCropImage").hide();
        }
      },

      error: function (xhr) {
        if (xhr.status === 401)
          if (confirm("Session expired. Please log in again.")) {
            // Handle session expiration
            window.location.href = "/index.html";
          } else {
            // Handle other errors
            alert(
              "Error searching crop: " +
                (xhr.responseText || "An unexpected error occurred.")
            );
          }
      },
    });
  }

  // Update Crop
  $("#updateBtn").on("click", function () {
    if (!validateCropInputs()) {
      return;
    }

    let formData = new FormData();
    formData.append("cropCommonName", $("#cropCommonName").val());
    formData.append("cropScientificName", $("#cropScientificName").val());
    formData.append("category", $("#cropCategory").val());
    formData.append("cropSeason", $("#cropSeason").val());
    formData.append("fieldCode", $("#field").val());
    if ($("#cropImage")[0].files[0]) {
      formData.append("cropImage", $("#cropImage")[0].files[0]);
    }

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/crops/${$(
        "#cropCode"
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
          "Crop has been updated successfully.",
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

  // Delete Crop
  $("#deleteBtn").on("click", function () {
    const cropCode = $("#cropCode").val();
    showPopup(
      "warning",
      "Confirm Delete",
      "Are you sure you want to delete this crop?",
      () => {
        $.ajax({
          url: `http://localhost:5050/crop-monitor/api/v1/crops/${cropCode}`,
          type: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },

          success: function () {
            Swal.fire(
              "Delete Successfully!",
              "Crop has been deleted successfully.",
              "success"
            );
            $("#cropForm")[0].reset();
            generateCropCode();
          },

          error: function (xhr) {
            if (xhr.status === 401) {
              // Handle session expiration
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

  // Clear Crop Form
  $("#clearBtn").on("click", function () {
    $("#cropForm")[0].reset();
    generateCropCode();
    $("#previewCropImage").hide(); // hide preview if any
  });
});
