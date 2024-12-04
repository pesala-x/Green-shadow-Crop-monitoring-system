package lk.ijse.pesalax.cropmonitorapplication.dao;

import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface StaffDAO extends JpaRepository<Staff, String> {
    @Query("SELECT s FROM Staff s WHERE s.id = :searchTerm OR s.firstName = :searchTerm")
    List<Staff> findByIdOrFirstName(@Param("searchTerm") String searchTerm);
}
