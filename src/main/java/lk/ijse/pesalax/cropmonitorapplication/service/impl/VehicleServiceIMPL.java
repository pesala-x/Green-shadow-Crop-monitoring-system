package lk.ijse.pesalax.cropmonitorapplication.service.impl;

import lk.ijse.pesalax.cropmonitorapplication.dao.VehicleDAO;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.VehicleDTO;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Vehicle;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.service.VehicleService;
import lk.ijse.pesalax.cropmonitorapplication.util.Mapping;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class VehicleServiceIMPL implements VehicleService {

    private final VehicleDAO vehicleDAO;
    private final Mapping mapping;

    @Override
    public void saveVehicle(VehicleDTO vehicleDTO) {

    }

    @Override
    public List<VehicleDTO> getAllVehicles() {
        return List.of();
    }

    @Override
    public VehicleDTO getSelectedVehicle(String vehicleCode) {
        return null;
    }

    @Override
    public void deleteVehicle(String vehicleCode) {

    }

    @Override
    public void updateVehicle(String vehicleCode, VehicleDTO vehicleDTO) {

    }
}
