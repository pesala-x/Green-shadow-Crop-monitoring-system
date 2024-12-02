package lk.ijse.pesalax.cropmonitorapplication.service.impl;

import lk.ijse.pesalax.cropmonitorapplication.dao.EquipmentDAO;
import lk.ijse.pesalax.cropmonitorapplication.dao.FieldDAO;
import lk.ijse.pesalax.cropmonitorapplication.dao.StaffDAO;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.EquipmentDTO;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Equipment;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Field;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Staff;
import lk.ijse.pesalax.cropmonitorapplication.exception.*;
import lk.ijse.pesalax.cropmonitorapplication.service.EquipmentService;
import lk.ijse.pesalax.cropmonitorapplication.util.Mapping;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
        List<Equipment> getAllEquipment = equipmentDAO.findAll();
        return mapping.convertToEquipmentListDTO(getAllEquipment);
    }

    @Override
    public void deleteEquipment(String equipmentId) {
        Optional<Equipment> selectedEquipment = equipmentDAO.findById(equipmentId);
        if (!selectedEquipment.isPresent()) {
            throw new CropNotFoundException(equipmentId);
        } else {
            equipmentDAO.deleteById(equipmentId);
        }
    }

    @Override
    public void updateEquipment(String equipmentId, EquipmentDTO equipmentDTO) {
        Equipment existingEquipment = equipmentDAO.findById(equipmentId)
                .orElseThrow(() -> new EquipmentNotFoundException("Equipment not found with ID: " + equipmentId));

        if (equipmentDTO.getEquipmentName() != null) {
            existingEquipment.setEquipmentName(equipmentDTO.getEquipmentName());
        }
        if (equipmentDTO.getEquipmentType() != null) {
            existingEquipment.setEquipmentType(equipmentDTO.getEquipmentType());
        }
        if (equipmentDTO.getEquipmentStatus() != null) {
            existingEquipment.setEquipmentStatus(equipmentDTO.getEquipmentStatus());
        }
        if (equipmentDTO.getFieldCode() != null) {
            Field field = fieldDAO.findById(equipmentDTO.getFieldCode())
                    .orElseThrow(() -> new FieldNotFoundException("Field not found with code: " + equipmentDTO.getFieldCode()));
            existingEquipment.setField(field);
        }
        if (equipmentDTO.getId() != null) {
            Staff staff = staffDAO.findById(equipmentDTO.getId())
                    .orElseThrow(() -> new StaffMemberNotFoundException("Staff not found with ID: " + equipmentDTO.getId()));
            existingEquipment.setStaff(staff);
        }

        equipmentDAO.save(existingEquipment);
    }

    @Override
    public List<EquipmentDTO> searchEquipment(String searchTerm) {
        List<Equipment> equipments = equipmentDAO.findByEquipmentIdOrEquipmentName(searchTerm, searchTerm);
        return mapping.convertToEquipmentListDTO(equipments);
    }
}
