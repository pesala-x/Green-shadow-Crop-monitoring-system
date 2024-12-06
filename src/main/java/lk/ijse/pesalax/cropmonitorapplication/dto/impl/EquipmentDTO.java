package lk.ijse.pesalax.cropmonitorapplication.dto.impl;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.pesalax.cropmonitorapplication.customObj.EquipmentResponse;
import lk.ijse.pesalax.cropmonitorapplication.dto.EquipmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EquipmentDTO implements EquipmentStatus, EquipmentResponse {
    @NotBlank(message = "Equipment id Cannot Be Null")
    private String equipmentId;
    @NotBlank(message = "Equipment Name Cannot Be Null")
    @Pattern(regexp = "^[A-Z][a-z]{2,}$", message = "Start with a capital letter " +
            "and have at least 3 characters, only alphabets allowed.")
    private String equipmentName;
    @NotBlank(message = "Equipment type Cannot Be Null")
    private String equipmentType;
    @NotBlank(message = "Equipment status Cannot Be Null")
    private String equipmentStatus;
    private String fieldCode;
    private String id;
}
