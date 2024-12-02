package lk.ijse.pesalax.cropmonitorapplication.service;

import lk.ijse.pesalax.cropmonitorapplication.customObj.FieldResponse;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.FieldDTO;

import java.util.List;

public interface FieldService {
    void saveField(FieldDTO fieldDTO);
    List<FieldDTO> getAllFields();

    List<FieldDTO> getSelectedField(String searchTerm);

    void deleteField(String fieldCode);

    void updateField(String fieldCode, FieldDTO fieldDTO);
}