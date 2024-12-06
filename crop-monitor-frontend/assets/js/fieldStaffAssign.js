$(document).ready(function () {
  // Load fields into the "fieldCode" dropdown
  function loadFieldsToDropdown() {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/fields/allFields",
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
      url: "http://localhost:5050/crop-monitor/api/v1/staff/allstaff",
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

  // Event listener to update the assigned role when staff member is selected
  $("#staffId").on("change", function () {
    const selectedOption = $(this).find(":selected");
    const role = selectedOption.data("role");
    $("#assignRole").val(role || "");
  });

 // Load all field staff assignments
 function loadFieldAssignments() {
  $.ajax({
    url: "http://localhost:5050/crop-monitor/api/v1/assignment/allassignments",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    success: function (assignments) {
      $("#assignmentTableBody").empty();
      assignments.forEach((assignment) => {
        const row = `<tr>
          <td>${assignment.fieldCode}</td>
          <td>${assignment.staffId}</td>
          <td>${assignment.assignedRole}</td>
          <td>${assignment.assignmentDate}</td>
        </tr>`;
        $("#assignmentTableBody").append(row);
      });

      // Sort
      if ($.fn.DataTable.isDataTable("#assignmentTable")) {
        $("#assignmentTable").DataTable().destroy();
      }
      $("#assignmentTable").DataTable({
        paging: true,
        searching: true,
        ordering: true,
        order: [[3, "asc"]],
      });
    },
    error: function (xhr) {
      console.error("Failed to load assignments:", xhr.responseText);
    },
  });
}


  // Validate inputs with SweetAlert popups
  function validateFieldStaffAssignInputs() {
    const fieldCodeInput = $("#fieldCode").val();
    const staffIdInput = $("#staffId").val();

    if (!fieldCodeInput) {
      Swal.fire("Invalid Input", "Please select a field season.", "error");
      return false;
    }
    if (!staffIdInput) {
      Swal.fire("Invalid Input", "Please select a staff.", "error");
      return false;
    }

    return true;
  }

  const today = new Date().toISOString().split("T")[0];
  $("#assignmentDate").val(today);

  $("#assignmentAdd").on("click", function () {
    $("#staffAssignmentModal").modal("show");
    loadFieldsToDropdown();
    loadStaffToDropdown();
  });

  // save fieldStaffAssign
  $("#saveAssignmentBtn").on("click", function () {
    if (!validateFieldStaffAssignInputs()) {
      return;
    }

    const assignmentData = {
      fieldCode: $("#fieldCode").val(),
      staffId: $("#staffId").val(),
      assignedRole: $("#assignRole").val(),
      assignmentDate: $("#assignmentDate").val(),
    };

    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/assignment/save",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(assignmentData),
      success: function () {
        Swal.fire("Success", "Assignment saved successfully!", "success");

        $("#staffAssignmentModal").modal("hide");

        $("#fieldCode").val("Select Field");
        $("#staffId").val("Select Staff");
        $("#assignRole").val("");

        loadFieldAssignments();
      },
      error: function (xhr) {
        if (xhr.status === 401) {
          showPopup(
            "warning",
            "Session Expired",
            "Your session has expired. Please log in again.",
            () => {
              window.location.href = "/index.html";
            }
          );
        } else if (xhr.status === 403) {
          showPopup(
            "error",
            "Permission Denied",
            "You do not have permission to perform this action."
          );
        } else {
          showPopup(
            "error",
            "Error",
            xhr.responseText || "An unexpected error occurred."
          );
        }
      },
    });
  });

  loadFieldAssignments();
});
