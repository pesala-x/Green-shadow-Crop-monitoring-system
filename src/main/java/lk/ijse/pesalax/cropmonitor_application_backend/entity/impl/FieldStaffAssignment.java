package lk.ijse.pesalax.cropmonitor_application_backend.entity.impl;

import jakarta.persistence.*;
import lk.ijse.pesalax.cropmonitor_application_backend.entity.SuperEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "field_staff_assignments")
public class FieldStaffAssignment implements SuperEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "field_code", nullable = false)
    private Field field;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id", nullable = false)
    private Staff staff;

    private String assignedRole;
    private String assignmentDate;
}
