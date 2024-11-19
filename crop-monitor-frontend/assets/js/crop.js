// crop code
function generateCropCode() {
  const code = "C-" + Math.floor(1000 + Math.random() * 900);
  document.getElementById("cropCode").value = code;
}

$(document).ready(function () {
  generateCropCode();

  $("#clearBtn").on("click", function () {
    generateCropCode();
    $("#cropForm")[0].reset();
  });
});
