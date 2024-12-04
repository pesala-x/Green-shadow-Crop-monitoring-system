package lk.ijse.pesalax.cropmonitorapplication.dto.impl;

import lk.ijse.pesalax.cropmonitorapplication.customObj.MonitoringLogResponse;
import lk.ijse.pesalax.cropmonitorapplication.dto.SuperDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MonitoringLogDTO implements SuperDTO, MonitoringLogResponse {
    private String log_code;
    private Date log_date;
    private String Observation;
    private String log_image;
    private String fieldCode;
    private String cropCode;
    private String id;
}

