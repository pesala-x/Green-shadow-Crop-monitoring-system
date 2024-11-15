package lk.ijse.pesalax.cropmonitorapplication.util;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.FieldDTO;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Field;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Mapping {
    @Autowired
    private ModelMapper modelMapper;

    public FieldDTO convertToFieldDTO(Field field) {
        return modelMapper.map(field, FieldDTO.class);
    }

    public Field convertToField(FieldDTO fieldDTO) {
        return modelMapper.map(fieldDTO, Field.class);
    }

    public List<FieldDTO> convertToFieldListDTO(List<Field> fields) {
        return modelMapper.map(fields, new TypeToken<List<FieldDTO>>() {
        }.getType());
    }
}
