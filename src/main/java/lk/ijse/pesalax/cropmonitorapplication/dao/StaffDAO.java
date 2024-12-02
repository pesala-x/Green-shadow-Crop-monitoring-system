package lk.ijse.pesalax.cropmonitorapplication.dao;

import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffDAO extends JpaRepository<Staff, String> {
}
