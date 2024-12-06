package lk.ijse.pesalax.cropmonitorapplication.dto.impl;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.pesalax.cropmonitorapplication.customObj.StaffResponse;
import lk.ijse.pesalax.cropmonitorapplication.dto.StaffStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StaffDTO implements StaffStatus, StaffResponse {
    @NotBlank(message = "Staff id Cannot Be Null")
    private String id;
    @NotBlank(message = "First Name Cannot Be Null")
    @Pattern(regexp = "^[A-Z][a-z]{2,}$", message = "Start with a capital letter " +
            "and have at least 3 characters, only alphabets allowed.")
    private String firstName;
    @NotBlank(message = "Last Name Cannot Be Null")
    @Pattern(regexp = "^[A-Z][a-z]{2,}$", message = "Start with a capital letter " +
            "and have at least 3 characters, only alphabets allowed.")
    private String lastName;
    @Pattern(regexp = "^[A-Za-z0-9]", message = "Designation not valid")
    private String designation;
    @NotBlank(message = "Staff gender Cannot Be Null")
    private String gender;
    @NotBlank(message = "Staff joined date Cannot Be Null")
    private Date joinedDate;
    @NotBlank(message = "Staff dob Cannot Be Null")
    private Date dob;
    @NotBlank(message = "Staff role Cannot Be Null")
    private String role;
    @NotBlank(message = "Staff Address Cannot Be Null")
    private String addressLine01;
    @NotBlank(message = "Staff Address Cannot Be Null")
    private String addressLine02;
    private String addressLine03;
    private String addressLine04;
    private String addressLine05;
    @NotBlank(message = "Staff ContactNo Cannot Be Null")
    @Pattern(regexp = "^[0-9]{10}$", message = "contact number not valid")
    private String contactNo;
    @NotBlank(message = "Staff email Cannot Be Null")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@gmail\\.com$", message = "email not valid")
    private String email;
    private String vehicleCode;
    private List<FieldDTO> fieldList = new ArrayList<>();
    private List<EquipmentDTO> equipmentList = new ArrayList<>();
    private List<MonitoringLogDTO> monitoringLogList = new ArrayList<>();
}
