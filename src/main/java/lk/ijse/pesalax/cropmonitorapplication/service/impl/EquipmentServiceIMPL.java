package lk.ijse.pesalax.cropmonitorapplication.service.impl;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.EquipmentDTO;
import lk.ijse.pesalax.cropmonitorapplication.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
@RequiredArgsConstructor
public class EquipmentServiceIMPL implements EquipmentService {
    @Override
    public void saveEquipment(EquipmentDTO equipmentDTO) {

    }

    @Override
    public List<EquipmentDTO> getAllEquipment() {
        return null;
    }

    @Override
    public void deleteEquipment(String id) {

    }

    @Override
    public void updateEquipment(String id, EquipmentDTO equipmentDTO) {

    }

    @Override
    public List<EquipmentDTO> searchEquipment(String searchTerm) {
        return null;
    }
}
