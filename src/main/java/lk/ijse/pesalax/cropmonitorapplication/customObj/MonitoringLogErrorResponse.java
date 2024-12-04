package lk.ijse.pesalax.cropmonitorapplication.customObj;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MonitoringLogErrorResponse implements Serializable,MonitoringLogResponse {
    private int errorCode;
    private String errorMessage;
}

