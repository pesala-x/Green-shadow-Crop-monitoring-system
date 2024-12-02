package lk.ijse.pesalax.cropmonitorapplication.dao;

import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentDAO extends JpaRepository<Equipment, String> {
}
