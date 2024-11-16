package lk.ijse.pesalax.cropmonitorapplication.service.impl;

import lk.ijse.pesalax.cropmonitorapplication.customObj.FieldErrorResponse;
import lk.ijse.pesalax.cropmonitorapplication.customObj.FieldResponse;
import lk.ijse.pesalax.cropmonitorapplication.dao.FieldDAO;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.FieldDTO;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Field;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.exception.FieldNotFoundException;
import lk.ijse.pesalax.cropmonitorapplication.service.FieldService;
import lk.ijse.pesalax.cropmonitorapplication.util.Mapping;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FieldServiceIMPL implements FieldService {
    private final FieldDAO fieldDAO;
    private final Mapping mapping;
    @Override
    public void saveField(FieldDTO fieldDTO) {
        Field saveField = fieldDAO.save(mapping.convertToField(fieldDTO));
        try {
            if (saveField == null) {
                throw new DataPersistException("Can't save field");
            }
        } catch (DataPersistException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<FieldDTO> getAllFields() {
        List<Field> getAllFields = fieldDAO.findAll();
        return mapping.convertToFieldListDTO(getAllFields);
    }

    @Override
    public FieldResponse getSelectedField(String fieldCode) {
        if (fieldDAO.existsById(fieldCode)) {
            Field fields = fieldDAO.getReferenceById(fieldCode);
            return mapping.convertToFieldDTO(fields);
        } else {
            return new FieldErrorResponse(0, "Field not found");
        }
    }

    @Override
    public void deleteField(String fieldCode) {
        Optional<Field> selectedField = fieldDAO.findById(fieldCode);
        if (!selectedField.isPresent()) {
            throw new FieldNotFoundException(fieldCode);
        } else {
            fieldDAO.deleteById(fieldCode);
        }
    }

    @Override
    public void updateField(String fieldCode, FieldDTO fieldDTO) {
        Optional<Field> tmpField = fieldDAO.findById(fieldCode);
        if (!tmpField.isPresent()) {
            throw new FieldNotFoundException("Field not found");
        } else {
            Field existingField = tmpField.get();

            if (fieldDTO.getFieldName() != null) {
                existingField.setFieldName(fieldDTO.getFieldName());
            }
            if (fieldDTO.getFieldLocation() != null) {
                existingField.setFieldLocation(fieldDTO.getFieldLocation());
            }
            if (fieldDTO.getExtentSize() != null) {
                existingField.setExtentSize(fieldDTO.getExtentSize());
            }
            if (fieldDTO.getFieldImage1() != null) {
                existingField.setFieldImage1(fieldDTO.getFieldImage1());
            }
            if (fieldDTO.getFieldImage2() != null) {
                existingField.setFieldImage2(fieldDTO.getFieldImage2());
            }
            fieldDAO.save(existingField);
        }
    }
}
