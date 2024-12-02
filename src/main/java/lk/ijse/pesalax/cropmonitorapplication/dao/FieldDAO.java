package lk.ijse.pesalax.cropmonitorapplication.dao;

import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Crop;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Field;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FieldDAO extends JpaRepository<Field, String> {
    List<Field> findByFieldCodeOrFieldName(String fieldCode, String fieldName);
}
