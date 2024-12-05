package lk.ijse.pesalax.cropmonitorapplication.dto.impl;

import lk.ijse.pesalax.cropmonitorapplication.dto.SuperDTO;
import lk.ijse.pesalax.cropmonitorapplication.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO implements SuperDTO {
    private String email;
    private String password;
    private Role role;
}

