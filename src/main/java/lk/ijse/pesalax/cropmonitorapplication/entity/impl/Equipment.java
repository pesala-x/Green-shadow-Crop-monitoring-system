package lk.ijse.pesalax.cropmonitorapplication.entity.impl;

import jakarta.persistence.*;
import lk.ijse.pesalax.cropmonitorapplication.entity.SuperEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = {"field","staff"})
@Entity
@Table(name = "equipments")
public class Equipment implements SuperEntity {
    @Id
    private String equipmentId;
    private String equipmentName;
    private String equipmentType;
    private String equipmentStatus;
    @ManyToOne
    @JoinColumn(name = "fieldCode", nullable = false)
    private Field field;
    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private Staff staff;
}
