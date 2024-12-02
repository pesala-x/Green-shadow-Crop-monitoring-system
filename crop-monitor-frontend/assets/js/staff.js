$(document).ready(function () {
  generateStaffID();
  loadVehicles();

  // Generate Staff ID
  function generateStaffID() {
    const id = "S-" + Math.floor(1000 + Math.random() * 9000);
    $("#staffId").val(id);
  }

  // Load vehicles for the dropdown
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

  // Save Staff
  $("#staffForm").on("submit", function (e) {
    e.preventDefault();

    const staffData = {
      id: $("#staffId").val(),
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      designation: $("#designation").val(),
      gender: $("#gender").val(),
      joinedDate: $("#joinedDate").val(),
      dob: $("#dob").val(),
      contactNo: $("#contactNo").val(),
      email: $("#email").val(),
      role: $("#role").val(),
      addressLine01: $("#address1").val(),
      addressLine02: $("#address2").val(),
      addressLine03: $("#address3").val(),
      addressLine04: $("#address4").val(),
      addressLine05: $("#address5").val(),
      vehicleCode: $("#vehicleList").val(),
    };

    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/staff",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(staffData),
      success: function () {
        alert("Staff saved successfully!");
        $("#staffForm")[0].reset();
        generateStaffID();
      },
      error: function (xhr) {
        alert("Error saving staff: " + xhr.responseText);
      },
    });
  });

  // search staff
  $("#searchIcon").on("click", function () {
    searchAndFillStaffForm();
  });

  $("#searchStaff").on("keypress", function (event) {
    if (event.which === 13) {
      searchAndFillStaffForm();
    }
  });

  function searchAndFillStaffForm() {
    const searchTerm = $("#searchStaff").val().trim();
    if (searchTerm === "") {
      alert("Please enter a staff ID or name.");
      return;
    }

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/staff?searchTerm=${encodeURIComponent(
        searchTerm
      )}`,
      type: "GET",
      success: function (staffList) {
        if (staffList.length === 0) {
          alert("No matching staff found.");
          return;
        }

        const staff = staffList[0];
        $("#staffId").val(staff.id);
        $("#firstName").val(staff.firstName);
        $("#lastName").val(staff.lastName);
        $("#designation").val(staff.designation).change();
        $("#gender").val(staff.gender).change();
        $("#joinedDate").val(
          new Date(staff.joinedDate).toISOString().slice(0, 10)
        );
        $("#dob").val(new Date(staff.dob).toISOString().slice(0, 10));
        $("#contactNo").val(staff.contactNo);
        $("#email").val(staff.email);
        $("#role").val(staff.role).change();
        $("#address1").val(staff.addressLine01);
        $("#address2").val(staff.addressLine02);
        $("#address3").val(staff.addressLine03);
        $("#address4").val(staff.addressLine04);
        $("#address5").val(staff.addressLine05);
        $("#vehicleList").val(staff.vehicleCode).change();
      },
      error: function (xhr) {
        alert("Error retrieving staff data: " + xhr.responseText);
      },
    });
  }

  // Update Staff
  $("#updateStaffBtn").on("click", function () {
    const staffId = $("#staffId").val();
    const staffData = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      designation: $("#designation").val(),
      gender: $("#gender").val(),
      joinedDate: $("#joinedDate").val(),
      dob: $("#dob").val(),
      contactNo: $("#contactNo").val(),
      email: $("#email").val(),
      role: $("#role").val(),
      addressLine01: $("#address1").val(),
      addressLine02: $("#address2").val(),
      addressLine03: $("#address3").val(),
      addressLine04: $("#address4").val(),
      addressLine05: $("#address5").val(),
      vehicleCode: $("#vehicleList").val(),
    };

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/staff/${staffId}`,
      type: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(staffData),
      success: function () {
        alert("Staff updated successfully!");
      },
      error: function () {
        alert("Error updating staff.");
      },
    });
  });

  // Delete Staff
  $("#deleteStaffBtn").on("click", function () {
    const staffId = $("#staffId").val();
    if (confirm("Are you sure you want to delete this staff member?")) {
      $.ajax({
        url: `http://localhost:5050/crop-monitor/api/v1/staff/${staffId}`,
        type: "DELETE",
        success: function () {
          alert("Staff deleted successfully!");
          $("#staffForm")[0].reset();
          generateStaffID();
        },
        error: function () {
          alert("Error deleting staff.");
        },
      });
    }
  });

  // Clear Staff Form
  $("#clearStaffBtn").on("click", function () {
    $("#staffForm")[0].reset();
    generateStaffID();
  });


  $("#getAllBtn").click(function () {
    console.log("Fetching all staff...");
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/staff/allstaff",
      type: "GET",
      success: function (staffList) {
        console.log("Staff data received:", staffList);

        let staffRows1 = "";
        let staffRows2 = "";

        staffList.forEach((staff) => {
          staffRows1 += `
            <tr>
              <td>${staff.id}</td>
              <td>${staff.firstName}</td>
              <td>${staff.lastName}</td>
              <td>${staff.designation}</td>
              <td>${staff.gender}</td>
              <td>${new Date(staff.joinedDate).toLocaleDateString()}</td>
              <td>${new Date(staff.dob).toLocaleDateString()}</td>
              <td>${staff.role}</td>
            </tr>
          `;

          staffRows2 += `
            <tr>
              <td>${staff.addressLine01 || "N/A"}</td>
              <td>${staff.addressLine02 || "N/A"}</td>
              <td>${staff.addressLine03 || "N/A"}</td>
              <td>${staff.addressLine04 || "N/A"}</td>
              <td>${staff.addressLine05 || "N/A"}</td>
              <td>${staff.contactNo}</td>
              <td>${staff.email}</td>
              td>${staff.vehicleCode}</td>
            </tr>
          `;
        });

        $("#staffTableBody1").html(staffRows1);
        $("#staffTableBody2").html(staffRows2);

        $("#staffListModal").modal("show");
      },
      error: function (xhr) {
        console.error("Failed to fetch staff data:", xhr.responseText);
        alert("Failed to fetch staff data.");
      },
    });
  });

});
