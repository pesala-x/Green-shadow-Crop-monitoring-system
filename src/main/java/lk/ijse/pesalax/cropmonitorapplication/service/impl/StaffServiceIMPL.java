package lk.ijse.pesalax.cropmonitorapplication.service.impl;

import lk.ijse.pesalax.cropmonitorapplication.dao.StaffDAO;
import lk.ijse.pesalax.cropmonitorapplication.dao.VehicleDAO;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.StaffDTO;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Staff;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Vehicle;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.exception.StaffMemberNotFoundException;
import lk.ijse.pesalax.cropmonitorapplication.exception.VehicleNotFoundException;
import lk.ijse.pesalax.cropmonitorapplication.service.StaffService;
import lk.ijse.pesalax.cropmonitorapplication.util.Mapping;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class StaffServiceIMPL implements StaffService {
    private final StaffDAO staffDAO;
    private final VehicleDAO vehicleDAO;
    private final Mapping mapping;

//    @Override
//    public void saveStaff(StaffDTO staffDTO) {
//        Vehicle vehicle = vehicleDAO.findById(staffDTO.getVehicleCode())
//                .orElseThrow(() -> new DataPersistException("Invalid Vehicle code"));
//        Staff staff = mapping.convertToStaff(staffDTO);
//        staff.setVehicle(vehicle);
//        Staff savedStaff = staffDAO.save(staff);
//        try {
//            if (savedStaff == null) {
//                throw new DataPersistException("Can't save Staff");
//            }
//        } catch (DataPersistException e) {
//            e.printStackTrace();
//        }
//    }

    @Override
    public void saveStaff(StaffDTO staffDTO) {
        Vehicle vehicle = vehicleDAO.findById(staffDTO.getVehicleCode())
                .orElseThrow(() -> new DataPersistException("Invalid Vehicle code"));

        if ("not available".equalsIgnoreCase(vehicle.getStatus())) {
            throw new DataPersistException("The selected vehicle is not available");
        }

        Staff staff = mapping.convertToStaff(staffDTO);
        staff.setVehicle(vehicle);

        Staff savedStaff = staffDAO.save(staff);
        if (savedStaff == null) {
            throw new DataPersistException("Can't save Staff");
        }

        vehicle.setStatus("out of service");
        vehicleDAO.save(vehicle);
    }
    @Override
    public List<StaffDTO> getAllStaffs() {
        List<Staff> getAllStaff = staffDAO.findAll();
        return mapping.convertToStaffListDTO(getAllStaff);
    }

    @Override
    public void deleteStaff(String id) {
        Optional<Staff> selectedMember = staffDAO.findById(id);
        if (!selectedMember.isPresent()) {
            throw new StaffMemberNotFoundException(id);
        } else {
            staffDAO.deleteById(id);
        }
    }

    @Override
    public void updateStaff(String id, StaffDTO staffDTO) {
        Staff existingStaff = staffDAO.findById(id)
                .orElseThrow(() -> new StaffMemberNotFoundException("Staff not found with id: " + id));
        if (staffDTO.getFirstName() != null) {
            existingStaff.setFirstName(staffDTO.getFirstName());
        }
        if (staffDTO.getLastName() != null) {
            existingStaff.setLastName(staffDTO.getLastName());
        }
        if (staffDTO.getDesignation() != null) {
            existingStaff.setDesignation(staffDTO.getDesignation());
        }
        if (staffDTO.getGender() != null) {
            existingStaff.setGender(staffDTO.getGender());
        }
        if (staffDTO.getJoinedDate() != null) {
            existingStaff.setJoinedDate(staffDTO.getJoinedDate());
        }
        if (staffDTO.getDob() != null) {
            existingStaff.setDob(staffDTO.getDob());
        }
        if (staffDTO.getRole() != null) {
            existingStaff.setRole(staffDTO.getRole());
        }
        if (staffDTO.getAddressLine01() != null) {
            existingStaff.setAddressLine01(staffDTO.getAddressLine01());
        }
        if (staffDTO.getAddressLine02() != null) {
            existingStaff.setAddressLine02(staffDTO.getAddressLine02());
        }
        if (staffDTO.getAddressLine03() != null) {
            existingStaff.setAddressLine03(staffDTO.getAddressLine03());
        }
        if (staffDTO.getAddressLine04() != null) {
            existingStaff.setAddressLine04(staffDTO.getAddressLine04());
        }
        if (staffDTO.getAddressLine05() != null) {
            existingStaff.setAddressLine05(staffDTO.getAddressLine05());
        }
        if (staffDTO.getContactNo() != null) {
            existingStaff.setContactNo(staffDTO.getContactNo());
        }
        if (staffDTO.getEmail() != null) {
            existingStaff.setEmail(staffDTO.getEmail());
        }
        if (staffDTO.getVehicleCode() != null) {
            Vehicle vehicle = vehicleDAO.findById(staffDTO.getVehicleCode())
                    .orElseThrow(() -> new VehicleNotFoundException("Vehicle not found with code: " + staffDTO.getVehicleCode()));
            existingStaff.setVehicle(vehicle);
        }
        staffDAO.save(existingStaff);
    }

    @Override
    public List<StaffDTO> searchStaff(String searchTerm) {
        List<Staff> members = staffDAO.findByIdOrFirstName(searchTerm);
        return mapping.convertToStaffListDTO(members);
    }

    @Override
    public void returnVehicle(String staffId) {
        // Find the staff member by ID
        Staff staff = staffDAO.findById(staffId)
                .orElseThrow(() -> new StaffMemberNotFoundException("Staff not found with ID: " + staffId));

        Vehicle vehicle = staff.getVehicle();
        if (vehicle == null) {
            throw new VehicleNotFoundException("No vehicle assigned to this staff member.");
        }

        vehicle.setStatus("available");
        vehicleDAO.save(vehicle);
    }
}
