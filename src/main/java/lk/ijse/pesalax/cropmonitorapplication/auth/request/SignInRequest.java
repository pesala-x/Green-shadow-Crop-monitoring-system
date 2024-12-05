package lk.ijse.pesalax.cropmonitorapplication.auth.request;

import lk.ijse.pesalax.cropmonitorapplication.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignInRequest {
    private String email;
    private String password;
    private Role role;
}
