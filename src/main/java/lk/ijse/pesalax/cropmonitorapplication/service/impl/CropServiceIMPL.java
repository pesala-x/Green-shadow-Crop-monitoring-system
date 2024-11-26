package lk.ijse.pesalax.cropmonitorapplication.service.impl;

import lk.ijse.pesalax.cropmonitorapplication.dao.CropDAO;
import lk.ijse.pesalax.cropmonitorapplication.dao.FieldDAO;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.CropDTO;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Crop;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Field;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.service.CropService;
import lk.ijse.pesalax.cropmonitorapplication.util.Mapping;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
@RequiredArgsConstructor
public class CropServiceIMPL implements CropService {
    private final CropDAO cropDAO;
    private final FieldDAO fieldDAO;
    private final Mapping mapping;
    @Override
    public void saveCrop(CropDTO cropDTO) {
        Field field = fieldDAO.findById(cropDTO.getFieldCode())
                .orElseThrow(() -> new DataPersistException("Invalid field code"));
        Crop crop = mapping.convertToCrop(cropDTO);
        crop.setField(field);
        Crop savedCrop = cropDAO.save(crop);
        try {
            if (savedCrop == null) {
                throw new DataPersistException("Can't save Crop");
            }
        } catch (DataPersistException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<CropDTO> searchCrops(String cropCode, String cropCommonName) {
        return null;
    }

    @Override
    public List<CropDTO> getAllCrops() {
        return null;
    }

    @Override
    public void deleteCrop(String cropCode) {

    }

    @Override
    public void updateCrop(String cropCode, CropDTO cropDTO) {

    }
}
