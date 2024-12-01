$(document).ready(function () {
  $("#fieldList").select2({
    placeholder: "Select options",
    allowClear: true,
    width: "100%",
  });
});

// Generate Staff ID
function generateStaffId() {
  const code = "S-" + Math.floor(1000 + Math.random() * 9000);
  document.getElementById("staffId").value = code;
}

$(document).ready(function () {
  generateStaffId();

  $("#clearStaffBtn").on("click", function () {
    generateStaffId();
    $("#staffForm")[0].reset();
  });
});

// Load vehicles to staff form dropdown
function loadVehicles() {
  $.ajax({
    url: "http://localhost:5050/crop-monitor/api/v1/vehicles/allVehicles",
    method: "GET",
    success: function (vehicles) {
      $("#vehicleList")
        .empty()
        .append("<option disabled selected>Select Vehicle</option>");

      vehicles.forEach((vehicle) => {
        $("#vehicleList").append(
          new Option(
            `${vehicle.vehicleCode} - ${vehicle.vehicleCategory}`,
            vehicle.vehicleCode
          )
        );
      });
    },
    error: function (xhr) {
      console.error("Failed to load vehicles:", xhr.responseText);
    },
  });
}

$(document).ready(function () {
  loadVehicles();
});
