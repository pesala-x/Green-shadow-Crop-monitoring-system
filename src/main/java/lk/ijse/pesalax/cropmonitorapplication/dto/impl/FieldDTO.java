package lk.ijse.pesalax.cropmonitorapplication.dto.impl;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.pesalax.cropmonitorapplication.customObj.FieldResponse;
import lk.ijse.pesalax.cropmonitorapplication.dto.FieldStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FieldDTO implements FieldStatus, FieldResponse {
    @NotBlank(message = "Field Code Cannot Be Null")
    private String fieldCode;
    @NotBlank(message = "Field Name Cannot Be Null")
    @Pattern(regexp = "^[A-Za-z0-9]", message = "Name not valid")
    private String fieldName;
    @NotBlank(message = "Field Location Cannot Be Null")
    @Pattern(regexp = "^[A-Z]", message = "Location not valid")
    private String fieldLocation;
    private Double extentSize;
    private String fieldImage1;
    private String fieldImage2;
    private List<CropDTO> crops = new ArrayList<>();
    private List<StaffDTO> staffList = new ArrayList<>();
    private List<EquipmentDTO> equipmentList = new ArrayList<>();
    private List<MonitoringLogDTO> monitoringLogList = new ArrayList<>();
}
