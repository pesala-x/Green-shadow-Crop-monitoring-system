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


});
