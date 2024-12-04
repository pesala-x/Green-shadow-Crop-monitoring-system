package lk.ijse.pesalax.cropmonitorapplication.controller;

import lk.ijse.pesalax.cropmonitorapplication.customObj.FieldErrorResponse;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.MonitoringLogDTO;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.service.MonitoringLogService;
import lk.ijse.pesalax.cropmonitorapplication.util.AppUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "api/v1/monitoringLog")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5501")
public class MonitoringLogController {
    private final MonitoringLogService monitoringLogService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveMonitoringLog(
            @RequestParam("logCode") String logCode,
            @RequestParam("logDate") String logDate,
            @RequestParam("observation") String observation,
            @RequestParam("logImage") MultipartFile logImage,
            @RequestParam("fieldCode") String fieldCode,
            @RequestParam("cropCode") String cropCode,
            @RequestParam("staffId") String id
    ) {
        try {
            String base64Image = AppUtil.toBase64(logImage.getBytes());

            MonitoringLogDTO logDTO = new MonitoringLogDTO();
            logDTO.setLog_code(logCode);
            logDTO.setLog_date(logDate);
            logDTO.setObservation(observation);
            logDTO.setLog_image(base64Image);
            logDTO.setFieldCode(fieldCode);
            logDTO.setCropCode(cropCode);
            logDTO.setId(id);

            monitoringLogService.saveMonitoringLog(logDTO);

            return new ResponseEntity<>(new FieldErrorResponse(0, "Monitoring Log saved successfully"), HttpStatus.CREATED);

        } catch (DataPersistException e) {
            return new ResponseEntity<>(new FieldErrorResponse(0, "Can't save: " + e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new FieldErrorResponse(0, "Internal server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
