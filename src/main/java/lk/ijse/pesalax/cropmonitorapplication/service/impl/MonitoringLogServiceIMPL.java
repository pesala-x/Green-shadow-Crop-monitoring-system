package lk.ijse.pesalax.cropmonitorapplication.service.impl;

import lk.ijse.pesalax.cropmonitorapplication.dao.CropDAO;
import lk.ijse.pesalax.cropmonitorapplication.dao.FieldDAO;
import lk.ijse.pesalax.cropmonitorapplication.dao.MonitoringLogDAO;
import lk.ijse.pesalax.cropmonitorapplication.dao.StaffDAO;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.MonitoringLogDTO;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Crop;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Field;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.MonitoringLog;
import lk.ijse.pesalax.cropmonitorapplication.entity.impl.Staff;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.service.MonitoringLogService;
import lk.ijse.pesalax.cropmonitorapplication.util.Mapping;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MonitoringLogServiceIMPL implements MonitoringLogService {
    private final CropDAO cropDAO;
    private final FieldDAO fieldDAO;
    private final StaffDAO staffDAO;
    private final MonitoringLogDAO monitoringLogDAO;
    private final Mapping mapping;

    @Override
    public void saveMonitoringLog(MonitoringLogDTO monitoringLogDTO) {
        Field field = fieldDAO.findById(monitoringLogDTO.getFieldCode())
                .orElseThrow(() -> new DataPersistException("Invalid field code"));
        Crop crop = cropDAO.findById(monitoringLogDTO.getCropCode())
                .orElseThrow(() -> new DataPersistException("Invalid crop code"));
        Staff staff = staffDAO.findById(monitoringLogDTO.getId())
                .orElseThrow(() -> new DataPersistException("Invalid staff ID"));

        MonitoringLog log = mapping.convertToMonitoringLog(monitoringLogDTO);
        log.setField(field);
        log.setCrop(crop);
        log.setStaff(staff);

        MonitoringLog savedLog = monitoringLogDAO.save(log);
        if (savedLog == null) {
            throw new DataPersistException("Can't save Monitoring Log");
        }
    }

    @Override
    public List<MonitoringLogDTO> searchMonitoringLog(String searchTerm) {
        return List.of();
    }

    @Override
    public List<MonitoringLogDTO> getAllMonitoringLog() {
        return List.of();
    }

    @Override
    public void deleteMonitoringLog(String log_code) {

    }

    @Override
    public void updateMonitoringLog(String log_code, MonitoringLogDTO monitoringLogDTO) {

    }
}
