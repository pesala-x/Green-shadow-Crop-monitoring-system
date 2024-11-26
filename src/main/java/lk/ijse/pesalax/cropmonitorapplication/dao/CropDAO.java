package lk.ijse.pesalax.cropmonitorapplication.dao;

import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CropDAO extends JpaRepository<Crop, String> {
    List<Crop> findByCropCodeOrCropCommonName(String cropCode, String cropCommonName);
}
