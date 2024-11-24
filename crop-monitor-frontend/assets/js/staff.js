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
