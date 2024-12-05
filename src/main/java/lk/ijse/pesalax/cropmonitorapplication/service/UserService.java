package lk.ijse.pesalax.cropmonitorapplication.service;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.UserDTO;
import lk.ijse.pesalax.cropmonitorapplication.util.Role;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    UserDetailsService userDetailService();

    List<UserDTO> getAllUser();

    UserDTO getUserDetails(String email, Role role);

    UserDTO saveUser(UserDTO userDTO);

    void updateUser(String email, UserDTO userDTO);

    void deleteUser(String email);
}
