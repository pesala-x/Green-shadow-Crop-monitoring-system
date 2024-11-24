// generate equipment ID
function generateEquipmentId() {
  const code = "E-" + Math.floor(1000 + Math.random() * 900);
  document.getElementById("equipmentId").value = code;
}

$(document).ready(function () {
  generateEquipmentId();

  $("#clearBtn").on("click", function () {
    generateEquipmentId();
    $("#equipmentForm")[0].reset();
  });
});
