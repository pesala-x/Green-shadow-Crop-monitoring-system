package lk.ijse.pesalax.cropmonitor_application_backend.dto.impl;

import lk.ijse.pesalax.cropmonitor_application_backend.dto.CropStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CropDTO implements CropStatus {
    private String cropCode;
    private String cropCommonName;
    private String cropScientificName;
    private String category;
    private String cropSeason;
    private String cropImage;
    private String fieldCode;
}
