package lk.ijse.pesalax.cropmonitorapplication.dao;

import lk.ijse.pesalax.cropmonitorapplication.entity.impl.MonitoringLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface MonitoringLogDAO extends JpaRepository<MonitoringLog, String> {
//    List<MonitoringLog> findByMonitoringLogCodeOrMonitoringLogDate(String logCode, Date logDate);
}
