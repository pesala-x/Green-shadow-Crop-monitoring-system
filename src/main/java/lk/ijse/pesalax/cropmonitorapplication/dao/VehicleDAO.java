package lk.ijse.pesalax.cropmonitorapplication.dao;

import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleDAO extends JpaRepository<Vehicle,String> {
}
