package lk.ijse.pesalax.cropmonitorapplication.dto.impl;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.pesalax.cropmonitorapplication.customObj.CropResponse;
import lk.ijse.pesalax.cropmonitorapplication.dto.CropStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CropDTO implements CropStatus, CropResponse {
    @NotBlank(message = "Crop code Cannot Be Null")
    private String cropCode;
    @NotBlank(message = "Crop Name Cannot Be Null")
    @Pattern(regexp = "^[A-Z][a-z]{2,}$", message = "Start with a capital letter " +
            "and have at least 3 characters, only alphabets allowed.")
    private String cropCommonName;
    @NotBlank(message = "Crop Scientific Name Cannot Be Null")
    @Pattern(regexp = "^[A-Za-z0-9]", message = "Scientific Name not valid")
    private String cropScientificName;
    private String category;
    private String cropSeason;
    private String cropImage;
    private String fieldCode;
    private List<MonitoringLogDTO> monitoringLogList = new ArrayList<>();
}