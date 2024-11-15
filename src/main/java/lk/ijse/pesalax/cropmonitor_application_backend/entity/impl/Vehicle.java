package lk.ijse.pesalax.cropmonitor_application_backend.entity.impl;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lk.ijse.pesalax.cropmonitor_application_backend.entity.SuperEntity;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "staff")
@Entity
@Table(name = "vehicles")
public class Vehicle implements SuperEntity {
    @Id
    private String vehicleCode;
    private String licensePlateNumber;
    private String vehicleCategory;
    private String fuelType;
    private String status;
    private String remarks;
    @OneToMany(mappedBy = "vehicle")
    private List<Staff> staff = new ArrayList<>();
}