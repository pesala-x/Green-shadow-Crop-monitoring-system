package lk.ijse.pesalax.cropmonitorapplication.dto.impl;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.pesalax.cropmonitorapplication.dto.VehicleStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class VehicleDTO implements VehicleStatus {
    @NotBlank(message = "Vehicle code Can Not be Null")
    private String vehicleCode;
    @NotBlank(message = "Vehicle license plate number Can Not be Null")
    @Pattern(regexp = "^[A-Z][a-z]{2,}$", message = "Start with a capital letter " +
            "and have at least 3 characters, only alphabets allowed.")
    private String licensePlateNumber;
    @NotBlank(message = "Vehicle category Can Not be Null")
    private String vehicleCategory;
    @NotBlank(message = "Vehicle fuel type Can Not be Null")
    private String fuelType;
    @NotBlank(message = "Vehicle status Can Not be Null")
    private String status;
    private String remarks;
    private List<StaffDTO> staff = new ArrayList<>();
}

