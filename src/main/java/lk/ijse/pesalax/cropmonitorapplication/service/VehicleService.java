package lk.ijse.pesalax.cropmonitorapplication.service;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.VehicleDTO;

import java.util.List;

public interface VehicleService {
    void saveVehicle(VehicleDTO vehicleDTO);

    List<VehicleDTO> getAllVehicles();

    List<VehicleDTO> searchVehicles(String searchTerm);

    void deleteVehicle(String vehicleCode);

    void updateVehicle(String vehicleCode, VehicleDTO vehicleDTO);
}
