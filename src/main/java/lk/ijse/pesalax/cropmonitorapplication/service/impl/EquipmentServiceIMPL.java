package lk.ijse.pesalax.cropmonitorapplication.service.impl;

import lk.ijse.pesalax.cropmonitorapplication.dao.EquipmentDAO;
import lk.ijse.pesalax.cropmonitorapplication.dao.FieldDAO;
import lk.ijse.pesalax.cropmonitorapplication.dao.StaffDAO;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.EquipmentDTO;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Equipment;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Field;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Staff;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.service.EquipmentService;
import lk.ijse.pesalax.cropmonitorapplication.util.Mapping;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
@RequiredArgsConstructor
public class EquipmentServiceIMPL implements EquipmentService {
    private final EquipmentDAO equipmentDAO;
    private final FieldDAO fieldDAO;
    private final StaffDAO staffDAO;
    private final Mapping mapping;

    @Override
    public void saveEquipment(EquipmentDTO equipmentDTO) {
        Field field = fieldDAO.findById(equipmentDTO.getFieldCode())
                .orElseThrow(() -> new DataPersistException("Invalid Field code"));
        Staff staff = staffDAO.findById(equipmentDTO.getId())
                .orElseThrow(() -> new DataPersistException("Invalid Staff code"));

        Equipment equipment = mapping.convertToEquipment(equipmentDTO);

        equipment.setField(field);
        equipment.setStaff(staff);
        Equipment savedEquipment = equipmentDAO.save(equipment);
        try {
            if (savedEquipment == null) {
                throw new DataPersistException("Can't save Equipment");
            }
        } catch (DataPersistException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<EquipmentDTO> getAllEquipment() {
        return List.of();
    }

    @Override
    public void deleteEquipment(String id) {

    }

    @Override
    public void updateEquipment(String id, EquipmentDTO equipmentDTO) {

    }

    @Override
    public List<EquipmentDTO> searchEquipment(String searchTerm) {
        return List.of();
    }
}
