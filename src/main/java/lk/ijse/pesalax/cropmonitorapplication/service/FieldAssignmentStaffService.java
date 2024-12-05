package lk.ijse.pesalax.cropmonitorapplication.service;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.FieldStaffAssignmentDTO;

import java.util.List;

public interface FieldAssignmentStaffService {
    void saveAssignment(FieldStaffAssignmentDTO fieldStaffAssignmentDTO);
    List<FieldStaffAssignmentDTO> getAllFieldStaffAssignments();
}
