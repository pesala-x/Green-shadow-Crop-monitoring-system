package lk.ijse.pesalax.cropmonitorapplication.dto.impl;

import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "Monitoring log code Cannot Be Null")
    private String log_code;
    @NotBlank(message = "Monitoring log date Cannot Be Null")
    private String log_date;
    @NotBlank(message = "Monitoring log observation Cannot Be Null")
    private String Observation;
    private String log_image;
    private String fieldCode;
    private String cropCode;
    private String id;
}
