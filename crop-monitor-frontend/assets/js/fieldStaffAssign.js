$(document).ready(function () {
  // Load fields into the "fieldCode" dropdown
  function loadFieldsToDropdown() {
    $.ajax({
      url: "http://localhost:5050/cropmonitoring/api/v1/fields/allFields", // Endpoint to fetch fields
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (fields) {
        $("#fieldCode")
          .empty()
          .append("<option disabled selected>Select Field</option>");

        fields.forEach((field) => {
          $("#fieldCode").append(
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

  loadFieldsToDropdown();

  // Load staff into the "staffId" dropdown
  function loadStaffToDropdown() {
    $.ajax({
      url: "http://localhost:5050/cropmonitoring/api/v1/staff/allstaff", // Endpoint to fetch staff
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (staff) {
        $("#staffId")
          .empty()
          .append("<option disabled selected>Select Staff</option>");

        staff.forEach((member) => {
          $("#staffId").append(
            new Option(`${member.firstName} (${member.id})`, member.id)
          );
          $(`#staffId option[value='${member.id}']`).data("role", member.role);
        });
      },
      error: function (xhr) {
        console.error("Failed to load staff:", xhr.responseText);
      },
    });
  }

  loadStaffToDropdown();

  // Event listener to update the assigned role when a staff member is selected
  $("#staffId").on("change", function () {
    const selectedOption = $(this).find(":selected");
    const role = selectedOption.data("role");
    $("#assignRole").val(role || "");
  });

  // Date
  const today = new Date().toISOString().split("T")[0];
  $("#assignmentDate").val(today);

  $("#assignmentAdd").on("click", function () {
    $("#staffAssignmentModal").modal("show");
  });
});

// Load all field staff assignments
function loadFieldAssignments() {
  $.ajax({
    url: "http://localhost:5050/cropmonitoring/api/v1/assignment/allassignments", // Endpoint to get assignments
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    success: function (assignments) {
      // Clear the table body
      $("#assignmentTableBody").empty();

      // Append each assignment as a row
      assignments.forEach(function (assignment) {
        const row = `<tr>
                      <td>${assignment.fieldCode}</td>
                      <td>${assignment.staffId}</td>
                      <td>${assignment.assignedRole}</td>
                      <td>${assignment.assignmentDate}</td>
                    </tr>`;
        $("#assignmentTableBody").append(row);
      });
    },
    error: function (xhr) {
      console.error("Failed to load assignments:", xhr.responseText);
      alert("Failed to load assignments!");
    },
  });
}

$(document).ready(function () {
  // Initial load of assignments
  loadFieldAssignments();

  // Save functionality
  $(".btn-success").on("click", function () {
    const assignmentData = {
      fieldCode: $("#fieldCode").val(),
      staffId: $("#staffId").val(),
      assignedRole: $("#assignRole").val(),
      assignmentDate: $("#assignmentDate").val(), // Include the date
    };

    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/assignment/save",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(assignmentData),
      success: function (response) {
        $("#staffAssignmentModal").modal("hide");
        // Trigger refresh of assignments table
        loadFieldAssignments();
      },
      error: function (xhr) {
        console.error("Failed to save assignment:", xhr.responseText);
      },
    });
  });
});
