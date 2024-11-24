// generate vehicle code
function generateVehicleCode() {
  const code = "V-" + Math.floor(1000 + Math.random() * 900);
  document.getElementById("vehicleCode").value = code;
}

$(document).ready(function () {
  generateVehicleCode();

  $("#clearBtn").on("click", function () {
    generateVehicleCode();
    $("#vehicleForm")[0].reset();
  });
});
