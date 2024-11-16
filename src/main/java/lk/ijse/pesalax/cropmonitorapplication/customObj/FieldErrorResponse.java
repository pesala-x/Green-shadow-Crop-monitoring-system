package lk.ijse.pesalax.cropmonitorapplication.customObj;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FieldErrorResponse implements FieldResponse {
    private int errorCode;
    private String errorMessage;
}
