package lk.ijse.pesalax.cropmonitorapplication.dto.impl;

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
    private String id;
    private String firstName;
    private String lastName;
    private String designation;
    private String gender;
    private Date joinedDate;
    private Date dob;
    private String role;
    private String addressLine01;
    private String addressLine02;
    private String addressLine03;
    private String addressLine04;
    private String addressLine05;
    private String contactNo;
    private String email;
    private String vehicleCode;
    private List<FieldDTO> fieldList = new ArrayList<>();
    private List<EquipmentDTO> equipmentList = new ArrayList<>();
}
