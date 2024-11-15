package lk.ijse.pesalax.cropmonitor_application_backend.entity.impl;

import jakarta.persistence.*;
import lk.ijse.pesalax.cropmonitor_application_backend.entity.SuperEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "field")
@Entity
@Table(name = "crops")
public class Crop implements SuperEntity {
    @Id
    private String cropCode;
    private String cropCommonName;
    private String cropScientificName;
    private String category;
    private String cropSeason;
    private String cropImage;
    @ManyToOne
    @JoinColumn(name = "fieldCode", nullable = false)
    private Field field;
}