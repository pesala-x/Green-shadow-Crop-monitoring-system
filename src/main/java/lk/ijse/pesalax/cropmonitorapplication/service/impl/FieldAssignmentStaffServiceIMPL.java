package lk.ijse.pesalax.cropmonitorapplication.service.impl;

import lk.ijse.pesalax.cropmonitorapplication.dao.FieldDAO;
import lk.ijse.pesalax.cropmonitorapplication.dao.FieldStaffAssignmentDAO;
import lk.ijse.pesalax.cropmonitorapplication.dao.StaffDAO;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.FieldStaffAssignmentDTO;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Field;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.FieldStaffAssignment;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Staff;
import lk.ijse.pesalax.cropmonitorapplication.service.FieldAssignmentStaffService;
import lk.ijse.pesalax.cropmonitorapplication.util.Mapping;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FieldAssignmentStaffServiceIMPL implements FieldAssignmentStaffService {
    private final FieldStaffAssignmentDAO fieldStaffAssignmentDAO;
    private final FieldDAO fieldDAO;
    private final StaffDAO staffDAO;
    private final Mapping mapping;

    @Override
    public void saveAssignment(FieldStaffAssignmentDTO fieldStaffAssignmentDTO) {
        FieldStaffAssignment fieldStaffAssignment = new FieldStaffAssignment();
        Field field = fieldDAO.findById(fieldStaffAssignmentDTO.getFieldCode())
                .orElseThrow(() -> new RuntimeException("Field not found"));

        Staff staff = staffDAO.findById(fieldStaffAssignmentDTO.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found"));
        fieldStaffAssignment.setField(field);
        fieldStaffAssignment.setStaff(staff);
        fieldStaffAssignment.setAssignedRole(fieldStaffAssignmentDTO.getAssignedRole());
        fieldStaffAssignment.setAssignmentDate(fieldStaffAssignmentDTO.getAssignmentDate());

        fieldStaffAssignmentDAO.save(fieldStaffAssignment);
    }

    @Override
    public List<FieldStaffAssignmentDTO> getAllFieldStaffAssignments() {
        List<FieldStaffAssignment> logs = fieldStaffAssignmentDAO.findAll();
        return mapping.convertToFieldStaffAssignmentDTOList(logs);
    }
}

