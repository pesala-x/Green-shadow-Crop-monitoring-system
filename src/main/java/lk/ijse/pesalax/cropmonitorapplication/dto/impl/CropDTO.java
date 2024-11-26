package lk.ijse.pesalax.cropmonitorapplication.dto.impl;

import lk.ijse.pesalax.cropmonitorapplication.customObj.CropResponse;
import lk.ijse.pesalax.cropmonitorapplication.dto.CropStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CropDTO implements CropStatus, CropResponse {
    private String cropCode;
    private String cropCommonName;
    private String cropScientificName;
    private String category;
    private String cropSeason;
    private String cropImage;
    private String fieldCode;
}
