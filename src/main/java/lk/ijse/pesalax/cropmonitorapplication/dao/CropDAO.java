package lk.ijse.pesalax.cropmonitorapplication.dao;

import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropDAO extends JpaRepository<Crop, String> {
}
