$(document).ready(function () {
  $("#crops").select2({
    placeholder: "Select crops",
    allowClear: true,
    closeOnSelect: false,
    width: "100%",
  });

  // Clear search input & refresh dropdown after each item is selected
  $("#crops").on("select2:select", function (e) {
    let $searchField =
      $(this).data("select2").dropdown.$search ||
      $(this).data("select2").selection.$search;
    $searchField.val("");
    $searchField.trigger("focus");
    $(this).select2("close");
    $(this).select2("open");
  });

  // Close dropdown when clicking outside
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest("#crops").length &&
      !$(e.target).closest(".select2-container").length
    ) {
      $("#crops").select2("close");
    }
  });
});

// field code

function generateFieldCode() {
  const code = "F-" + Math.floor(1000 + Math.random() * 900);
  document.getElementById("fieldCode").value = code;
}

$(document).ready(function () {
  generateFieldCode();

  $("#clearBtn").on("click", function () {
    generateFieldCode();
    $("#fieldForm")[0].reset();
  });
});

// Save Field
$("#fieldForm").on("submit", function (e) {
  e.preventDefault();

  let formData = new FormData(this);
  formData.append("fieldCode", $("#fieldCode").val());
  formData.append("fieldName", $("#fieldName").val());
  formData.append("fieldLocation", $("#fieldLocation").val());
  formData.append("extentSize", $("#fieldSize").val());
  formData.append("fieldImage1", $("#fieldImage1")[0].files[0]);
  formData.append("fieldImage2", $("#fieldImage2")[0].files[0]);

  $.ajax({
    url: "http://localhost:5050/cropmonitoring/api/v1/fields",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      alert("Field saved successfully!");
      $("#fieldForm")[0].reset();
    },
    error: function (xhr, status, error) {
      alert("Error saving field: " + xhr.responseJSON.message);
    },
  });
});

// Get All Fields
$("#getAllBtn").on("click", function () {
  $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/fields/allFields",
      type: "GET",
      contentType: "application/json",
      success: function (data) {
          let tableBody = $("#fieldTableBody");
          tableBody.empty();
          data.forEach(field => {
              tableBody.append(`
                  <tr>
                      <td>${field.fieldCode}</td>
                      <td>${field.fieldName}</td>
                      <td>${field.fieldLocation}</td>
                      <td>${field.extentSize}</td>
                      <td>${field.crops.join(", ")}</td>
                      <td>${field.staff}</td>
                      <td><img src="data:image/png;base64,${field.fieldImage1}" alt="Image 1" style="max-height: 50px;"></td>
                      <td><img src="data:image/png;base64,${field.fieldImage2}" alt="Image 2" style="max-height: 50px;"></td>
                  </tr>
              `);
          });
          $("#fieldListModal").modal("show");
      },
      error: function () {
          alert("Error retrieving field list.");
      }
  });
});

// Update Field
$("#updateBtn").on("click", function () {
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
      url: `http://127.0.0.1:8080/api/v1/fields/${$("#fieldCode").val()}`,
      type: "PATCH",
      data: formData,
      contentType: false,
      processData: false,
      success: function () {
          alert("Field updated successfully!");
      },
      error: function () {
          alert("Error updating field.");
      }
  });
});

// Delete Field
$("#deleteBtn").on("click", function () {
  const fieldCode = $("#fieldCode").val();
  if (confirm("Are you sure you want to delete this field?")) {
      $.ajax({
          url: `http://127.0.0.1:8080/api/v1/fields/${fieldCode}`,
          type: "DELETE",
          success: function () {
              alert("Field deleted successfully!");
              $("#fieldForm")[0].reset();
              generateFieldCode();
          },
          error: function () {
              alert("Error deleting field.");
          }
      });
  }
});
