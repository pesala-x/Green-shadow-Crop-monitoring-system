package lk.ijse.pesalax.cropmonitor_application_backend.dto.impl;

import lk.ijse.pesalax.cropmonitor_application_backend.dto.VehicleStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class VehicleDTO implements VehicleStatus {
    private String vehicleCode;
    private String licensePlateNumber;
    private String vehicleCategory;
    private String fuelType;
    private String status;
    private String remarks;
    private List<StaffDTO> staff = new ArrayList<>();
}
