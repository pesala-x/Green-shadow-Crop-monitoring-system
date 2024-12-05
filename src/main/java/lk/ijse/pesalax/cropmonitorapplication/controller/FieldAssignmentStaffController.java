package lk.ijse.pesalax.cropmonitorapplication.controller;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.FieldStaffAssignmentDTO;
import lk.ijse.pesalax.cropmonitorapplication.service.FieldAssignmentStaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/v1/assignment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5501")
public class FieldAssignmentStaffController {
    private final FieldAssignmentStaffService fieldAssignmentStaffService;

    @PreAuthorize("hasAnyRole('MANAGER')")
    @PostMapping("/save")
    public ResponseEntity<String> saveAssignment(@RequestBody FieldStaffAssignmentDTO assignmentDTO) {
        fieldAssignmentStaffService.saveAssignment(assignmentDTO);
        return ResponseEntity.ok("Assignment saved successfully");
    }
}
