$(document).ready(function () {
  // Vehicle code generation
  function generateVehicleCode() {
    const code = "V-" + Math.floor(1000 + Math.random() * 900);
    $("#vehicleCode").val(code);
  }
  generateVehicleCode();

  // save vehicle
  $("#vehicleForm").on("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);
    formData.append("vehicleCode", $("#vehicleCode").val());
    formData.append("licensePlateNumber", $("#licensePlate").val());
    formData.append("vehicleCategory", $("#vehicleCategory").val());
    formData.append("fuelType", $("#fuelType").val());
    formData.append("status", $("#status").val());
    formData.append("allocatedStaff", $("#allocatedStaff").val());
    formData.append("remarks", $("#remarks").val());

    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/vehicles",
      type: "POST",
      data: JSON.stringify(Object.fromEntries(formData)),
      contentType: "application/json",
      processData: false,
      success: function (response) {
        alert("Vehicle saved successfully!");
        $("#vehicleForm")[0].reset();
        generateVehicleCode();
      },
      error: function (xhr, status, error) {
        alert(xhr.responseText);
      },
    });
  });

  // search vehicle
  $("#searchIcon").on("click", function () {
    searchAndFillVehicleForm();
  });

  $("#searchField").on("keypress", function (e) {
    if (e.which == 13) {
      searchAndFillVehicleForm();
    }
  });

  function searchAndFillVehicleForm() {
    const searchTerm = $("#searchField").val().trim();
    if (searchTerm === "") {
      alert("Please enter a Vehicle Code or License Plate Number.");
      return;
    }

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/vehicles?searchTerm=${encodeURIComponent(
        searchTerm
      )}`,
      type: "GET",
      contentType: "application/json",
      success: function (data) {
        if (data.length === 0) {
          alert("No matching vehicle found.");
          return;
        }

        const vehicle = data[0];
        $("#vehicleCode").val(vehicle.vehicleCode);
        $("#licensePlate").val(vehicle.licensePlateNumber);
        $("#vehicleCategory").val(vehicle.vehicleCategory).change();
        $("#fuelType").val(vehicle.fuelType).change();
        $("#status").val(vehicle.status).change();
        $("#allocatedStaff").val(vehicle.allocatedStaff).change();
        $("#remarks").val(vehicle.remarks);
      },
      error: function (xhr) {
        alert("Error retrieving vehicle data: " + xhr.responseText);
      },
    });
  }

  // Update vehicle
  $("#updateBtn").click(function () {
    const vehicleCode = $("#vehicleCode").val();
    if (!vehicleCode) return alert("Please enter Vehicle Code to update.");

    let formData = {
      licensePlateNumber: $("#licensePlate").val(),
      vehicleCategory: $("#vehicleCategory").val(),
      fuelType: $("#fuelType").val(),
      status: $("#status").val(),
      allocatedStaff: $("#allocatedStaff").val(),
      remarks: $("#remarks").val(),
    };

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/vehicles/${vehicleCode}`,
      type: "PATCH",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function () {
        alert("Vehicle updated successfully!");
        clearForm();
      },
      error: function (xhr) {
        alert("Failed to update vehicle: " + xhr.responseText);
      },
    });
  });

  // Delete vehicle
  $("#deleteBtn").click(function () {
    const vehicleCode = $("#vehicleCode").val();
    if (!vehicleCode) return alert("Please enter Vehicle Code to delete.");

    $.ajax({
      url: `http://localhost:5050/crop-monitor/api/v1/vehicles/${vehicleCode}`,
      type: "DELETE",
      success: function () {
        alert("Vehicle deleted successfully!");
        clearForm();
      },
      error: function (xhr) {
        alert("Failed to delete vehicle: " + xhr.responseText);
      },
    });
  });

  // Get all vehicles
  $("#getAllBtn").click(function () {
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v1/vehicles/allVehicles",
      type: "GET",
      success: function (vehicles) {
        let vehicleRows = "";
        vehicles.forEach((vehicle) => {
          vehicleRows += `
            <tr>
              <td>${vehicle.vehicleCode}</td>
              <td>${vehicle.licensePlateNumber}</td>
              <td>${vehicle.vehicleCategory}</td>
              <td>${vehicle.fuelType}</td>
              <td>${vehicle.status}</td>
              <td>${vehicle.allocatedStaff}</td>
              <td>${vehicle.remarks}</td>
            </tr>
          `;
        });
        $("#vehicleTableBody").html(vehicleRows);
      },
      error: function (xhr) {
        alert("Failed to fetch vehicles: " + xhr.responseText);
      },
    });
  });

  // Clear form
  $(document).ready(function () {
    generateVehicleCode();

    $("#clearBtn").on("click", function () {
      generateVehicleCode();

      $("#vehicleForm")
        .find("input, select, textarea")
        .not("#vehicleCode")
        .val("")
        .trigger("change");
    });
  });
});
