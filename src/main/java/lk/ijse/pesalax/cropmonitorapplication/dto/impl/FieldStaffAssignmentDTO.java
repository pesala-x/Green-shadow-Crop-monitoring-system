package lk.ijse.pesalax.cropmonitorapplication.dto.impl;

import lk.ijse.pesalax.cropmonitorapplication.dto.FieldStaffAssigmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FieldStaffAssignmentDTO implements FieldStaffAssigmentStatus {
    private Long id;
    private FieldDTO field;
    private StaffDTO staff;
    private String assignedRole;
    private String assignmentDate;
}