// Generate Monitoring Log Code
function generateLogCode() {
  const code = "L-" + Math.floor(1000 + Math.random() * 900);
  $("#logCode").val(code);
}

$(document).ready(function () {
  generateLogCode();
  loadFields();

  // Load fields into dropdown
  function loadFields() {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/fields/allFields",
      method: "GET",
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
});
