package lk.ijse.pesalax.cropmonitorapplication.dao;

import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Field;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FieldDAO extends JpaRepository<Field, String> {
}
