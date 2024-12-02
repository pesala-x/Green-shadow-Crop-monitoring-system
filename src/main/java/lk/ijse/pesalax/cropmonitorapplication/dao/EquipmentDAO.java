package lk.ijse.pesalax.cropmonitorapplication.dao;

import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentDAO extends JpaRepository<Equipment, String> {
    List<Equipment> findByEquipmentIdOrEquipmentName(String equipmentId, String equipmentName);
}
