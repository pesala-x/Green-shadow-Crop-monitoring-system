$(document).ready(function () {
  generateEquipmentID();
  loadFieldDropdown();
  loadStaffDropdown();

  // Generate Equipment ID
  function generateEquipmentID() {
    const id = "E-" + Math.floor(1000 + Math.random() * 9000);
    $("#equipmentId").val(id);
  }

// Load Staff Dropdown
function loadStaffDropdown() {
  $.ajax({
    url: "http://localhost:5050/crop-monitor/api/v1/staff/allstaff",
    method: "GET",
    success: function (staffList) {
      staffList.forEach((staff) => {
        $("#assignedStaff").append(
          `<option value="${staff.id}">${staff.id} - ${staff.firstName} ${staff.lastName}</option>`
        );
      });
    },
    error: function () {
      alert("Failed to load staff data.");
    },
  });
}

  // Load Field Dropdown
  function loadFieldDropdown() {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/fields/allFields",
      method: "GET",
      success: function (fieldList) {
        fieldList.forEach((field) => {
          $("#assignedField").append(
            `<option value="${field.fieldCode}">${field.fieldCode} - ${field.fieldName}</option>`
          );
        });
      },
      error: function () {
        alert("Failed to load field data.");
      },
    });
  }

});
