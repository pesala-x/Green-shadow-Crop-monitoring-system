package lk.ijse.pesalax.cropmonitorapplication.service.impl;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.CropDTO;
import lk.ijse.pesalax.cropmonitorapplication.service.CropService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
@RequiredArgsConstructor
public class CropServiceIMPL implements CropService {
    @Override
    public void saveCrop(CropDTO cropDTO) {

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
