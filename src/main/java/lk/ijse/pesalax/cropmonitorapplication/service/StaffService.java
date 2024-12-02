package lk.ijse.pesalax.cropmonitorapplication.service;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.StaffDTO;

import java.util.List;

public interface StaffService {
    void saveStaff(StaffDTO staffDTO);
    List<StaffDTO> getAllStaffs();
    void deleteStaff(String id);
    void updateStaff(String id, StaffDTO staffDTO);
    List<StaffDTO> searchStaff  (String searchTerm);
}
