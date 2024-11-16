package lk.ijse.pesalax.cropmonitorapplication.entity.impl;

import jakarta.persistence.*;
import lk.ijse.pesalax.cropmonitorapplication.entity.SuperEntity;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = {"vehicle", "assignments"})
@Entity
@Table(name = "staffs")
public class Staff implements SuperEntity {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String designation;
    private String gender;
    private Date joinedDate;
    private Date dob;
    private String address;
    private String role;
    private String contactNo;
    private String email;
    @ManyToOne
    @JoinColumn(name = "vehicleCode", nullable = false)
    private Vehicle vehicle;
    @OneToMany(mappedBy = "staff", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FieldStaffAssignment> assignments = new ArrayList<>();
}