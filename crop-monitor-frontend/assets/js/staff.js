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
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (vehicles) {
        $("#vehicleList")
          .empty()
          .append("<option disabled selected>Select Vehicle</option>");
        vehicles.forEach((vehicle) => {
          if (vehicle.status && vehicle.status.toLowerCase() === "available") {
            $("#vehicleList").append(
              new Option(
                `${vehicle.vehicleCode} - ${vehicle.vehicleCategory}`,
                vehicle.vehicleCode
              )
            );
          }
        });
        $("#vehicleList").append(new Option("Not Allocated", "not-allocated"));
      },
      error: function (xhr) {
        console.error("Failed to load vehicles:", xhr.responseText);
      },
    });
  }

  function isFirstLetterCapitalized(text) {
    return /^[A-Z]/.test(text);
  }

  // Function to validate inputs with SweetAlert popups
  function validateStaffInputs() {
    const firstNameInput = $("#firstName");
    const lastNameInput = $("#lastName");
    const designationInput = $("#designation");
    const genderInput = $("#gender");
    const joinedDateInput = $("#joinedDate");
    const dobInput = $("#dob");
    const contactNoInput = $("#contactNo");
    const emailInput = $("#email");
    const addressLine01Input = $("#address1");
    const addressLine02Input = $("#address2");
    const addressLine03Input = $("#address3");
    const addressLine04Input = $("#address4");
    const addressLine05Input = $("#address5");
    const roleInput = $("#role");
    const vehicleListInput = $("#vehicleList");

    const firstName = firstNameInput.val().trim();
    const lastName = lastNameInput.val().trim();
    const designation = designationInput.val();
    const gender = genderInput.val();
    const joinedDate = joinedDateInput.val();
    const dob = dobInput.val();
    const contactNo = contactNoInput.val().trim();
    const email = emailInput.val().trim();
    const addressLine01 = addressLine01Input.val().trim();
    const addressLine02 = addressLine02Input.val().trim();
    const addressLine03 = addressLine03Input.val().trim();
    const addressLine04 = addressLine04Input.val().trim();
    const addressLine05 = addressLine05Input.val().trim();
    const role = roleInput.val();
    const vehicleCode = vehicleListInput.val();

    if (!isFirstLetterCapitalized(firstName)) {
      showValidationError(
        "Invalid Input",
        "Staff First Name must start with a capital letter."
      );
      return false;
    }

    if (!isFirstLetterCapitalized(lastName)) {
      showValidationError(
        "Invalid Input",
        "Staff Last name must start with a capital letter."
      );
      return false;
    }

    if (!gender) {
      showValidationError("Invalid Input", "Please select a gender.");
      return false;
    }

    if (!joinedDate) {
      showValidationError("Invalid Input", "Please select a joined date.");
      return false;
    }

    if (!dob) {
      showValidationError("Invalid Input", "Please select a date of birth.");
      return false;
    }

    if (!/^\d{10}$/.test(contactNo)) {
      showValidationError(
        "Invalid Input",
        "Contact number must be 10 digits (e.g., 0771234567)."
      );
      return false;
    }

    if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(email)) {
      showValidationError(
        "Invalid Input",
        "Please enter a valid email address."
      );
      return false;
    }

    if (!addressLine01) {
      showValidationError("Not Empty", "Please input address line 01.");
      return false;
    }
    if (!addressLine02) {
      showValidationError("Not Empty", "Please input address line 02.");
      return false;
    }
    if (!addressLine03) {
      showValidationError("Not Empty", "Please input city.");
      return false;
    }
    if (!addressLine04) {
      showValidationError("Not Empty", "Please input state.");
      return false;
    }
    if (!addressLine05) {
      showValidationError("Not Empty", "Please input postal code.");
      return false;
    }

    if (!role) {
      showValidationError("Invalid Input", "Please select a role.");
      return false;
    }

    if (!vehicleCode) {
      showValidationError("Invalid Input", "Please select a vehicle.");
      return false;
    }

    return true;
  }

  function showValidationError(title, text) {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }

  function showPopup(type, title, text, confirmCallback = null) {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      showCancelButton: !!confirmCallback,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed && confirmCallback) {
        confirmCallback();
      }
    });
  }

  // Save Staff
  $("#staffForm").on("submit", function (e) {
    e.preventDefault();

    if (!validateStaffInputs()) {
      return;
    }

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
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function () {
        Swal.fire(
          "Save Successfully!",
          "Staff has been saved successfully.",
          "success"
        );
        $("#staffForm")[0].reset();
        generateStaffID();
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

  // search satff member
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
      showPopup(
        "warning",
        "Not Found",
        "Please enter a staff code ID name to search."
      );
      return;
    }

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/staff?searchTerm=${encodeURIComponent(
        searchTerm
      )}`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (staffList) {
        if (staffList.length === 0) {
          showPopup(
            "error",
            "Not Found",
            "Staff not found. Please try again!."
          );
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

        if (staff.vehicleCode === null || staff.vehicleCode.trim() === "") {
          $("#vehicleList").val("not-allocated").change();
        } else {
          $("#vehicleList").val(staff.vehicleCode).change();
        }
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
        } else {
          showPopup(
            "error",
            "Error",
            xhr.responseText || "An unexpected error occurred."
          );
        }
      },
    });
  }

  // Update Staff
  $("#updateStaffBtn").on("click", function () {
    if (!validateStaffInputs()) {
      return;
    }
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
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function () {
        Swal.fire(
          "Update Successfully!",
          "Staff has been updated successfully.",
          "success"
        );
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

  // Delete Staff
  $("#deleteStaffBtn").on("click", function () {
    const staffId = $("#staffId").val();
    showPopup(
      "warning",
      "Confirm Delete",
      "Are you sure you want to delete staff?",
      () => {
        $.ajax({
          url: `http://localhost:5050/crop-monitor/api/v1/staff/${staffId}`,
          type: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          success: function () {
            Swal.fire(
              "Delete Successfully!",
              "Staff has been deleted successfully.",
              "success"
            );
            $("#staffForm")[0].reset();
            generateStaffID();
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
      }
    );
  });

  // Clear Staff Form
  $("#clearStaffBtn").on("click", function () {
    $("#staffForm")[0].reset();
    generateStaffID();
  });
});

$(document).ready(function () {
  let sessionReturnedVehicles = new Set(
    JSON.parse(localStorage.getItem("returnedVehicles") || "[]")
  );

  // Save returned vehicles to localStorage
  function saveReturnedVehiclesToLocalStorage() {
    localStorage.setItem(
      "returnedVehicles",
      JSON.stringify(Array.from(sessionReturnedVehicles))
    );
  }

  // getAll staff
  $("#getAllBtn").click(function () {
    console.log("Fetching all staff...");
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/staff/allstaff",
      type: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      success: function (staffList) {
        console.log("Staff data received:", staffList);

        let staffRows1 = "";
        let staffRows2 = "";

        staffList.forEach((staff) => {
          const isReturned = sessionReturnedVehicles.has(staff.id);

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
              <td>
                ${
                  staff.vehicleCode
                    ? `${staff.vehicleCode} ${
                        !isReturned
                          ? `<button class="btn btn-sm btn-primary return-btn"
                                data-staff-id="${staff.id}"
                                data-vehicle-code="${staff.vehicleCode}">
                                Return
                            </button>`
                          : ""
                      }`
                    : "Not Allocated"
                }
              </td>
            </tr>`;
        });

        $("#staffTableBody1").html(staffRows1);
        $("#staffTableBody2").html(staffRows2);

        // Attach click handler for return buttons
        $(".return-btn").click(function () {
          const staffId = $(this).data("staff-id");
          const vehicleCode = $(this).data("vehicle-code");

          // Update vehicle status in backend
          $.ajax({
            url: `http://localhost:5050/crop-monitor/api/v1/staff/${staffId}/return-vehicle`,
            type: "PATCH",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            success: function () {
              Swal.fire(
                "Save Successfully!",
                "Vehicle returned successfully!",
                "success"
              );

              // Update local state and localStorage
              sessionReturnedVehicles.add(staffId);
              saveReturnedVehiclesToLocalStorage();

              // Hide the return button dynamically
              const button = $(`button[data-staff-id="${staffId}"]`);
              button.closest("td").html("Not Allocated");
            },
            error: function () {
              // alert("Error while returning the vehicle. Please try again.");
              showPopup(
                "error",
                "Error",
                "Error while returning the vehicle. Please try again."
              );
            },
          });
        });

        // Sort
        if ($.fn.DataTable.isDataTable("#cropTable")) {
          $("#cropTable").DataTable().destroy();
        }

        $("#cropTable").DataTable({
          paging: true,
          searching: true,
          ordering: true,
          order: [[0, "asc"]],
          scrollCollapse: true,
        });
        $("#staffListModal").modal("show");
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
});
