package lk.ijse.pesalax.cropmonitorapplication.service;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.MonitoringLogDTO;

import java.util.List;

public interface MonitoringLogService {
    void saveMonitoringLog(MonitoringLogDTO monitoringLogDTO);
    List<MonitoringLogDTO> searchMonitoringLog(String searchTerm);
    List<MonitoringLogDTO> getAllMonitoringLog();
    void deleteMonitoringLog(String log_code);
    void updateMonitoringLog(String log_code, MonitoringLogDTO monitoringLogDTO);
}
