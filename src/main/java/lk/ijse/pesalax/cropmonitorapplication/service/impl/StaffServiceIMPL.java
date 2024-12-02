package lk.ijse.pesalax.cropmonitorapplication.service.impl;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.StaffDTO;
import lk.ijse.pesalax.cropmonitorapplication.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
@RequiredArgsConstructor
public class StaffServiceIMPL implements StaffService {
    @Override
    public void saveStaff(StaffDTO staffDTO) {

    }

    @Override
    public List<StaffDTO> getAllStaffs() {
        return null;
    }

    @Override
    public void deleteStaff(String id) {

    }

    @Override
    public void updateStaff(String id, StaffDTO staffDTO) {

    }

    @Override
    public List<StaffDTO> searchStaff(String searchTerm) {
        return null;
    }
}
