package lk.ijse.pesalax.cropmonitorapplication.service.impl;

import lk.ijse.pesalax.cropmonitorapplication.dao.StaffDAO;
import lk.ijse.pesalax.cropmonitorapplication.dao.VehicleDAO;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.StaffDTO;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Staff;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Vehicle;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.service.StaffService;
import lk.ijse.pesalax.cropmonitorapplication.util.Mapping;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
@RequiredArgsConstructor
public class StaffServiceIMPL implements StaffService {
    private final StaffDAO staffDAO;
    private final VehicleDAO vehicleDAO;
    private final Mapping mapping;

    @Override
    public void saveStaff(StaffDTO staffDTO) {
        Vehicle vehicle = vehicleDAO.findById(staffDTO.getVehicleCode())
                .orElseThrow(() -> new DataPersistException("Invalid Vehicle code"));
        Staff staff = mapping.convertToStaff(staffDTO);
        staff.setVehicle(vehicle);
        Staff savedStaff = staffDAO.save(staff);
        try {
            if (savedStaff == null) {
                throw new DataPersistException("Can't save Staff");
            }
        } catch (DataPersistException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<StaffDTO> getAllStaffs() {
        return null;
    }

    @Override
    public void deleteStaff(String id) {

    }

    @Override
    public void updateStaff(String id, StaffDTO staffDTO) {

    }

    @Override
    public List<StaffDTO> searchStaff(String searchTerm) {
        return null;
    }
}
