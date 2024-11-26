package lk.ijse.pesalax.cropmonitorapplication.dao;

import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleDAO extends JpaRepository<Vehicle,String> {
    List<Vehicle> findByVehicleCodeOrVehicleCategory(String vehicleCode, String vehicleCategory);
}
