package lk.ijse.pesalax.cropmonitorapplication.controller;


import jakarta.validation.Valid;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.UserDTO;
import lk.ijse.pesalax.cropmonitorapplication.service.UserService;
import lk.ijse.pesalax.cropmonitorapplication.util.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v0/user")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class UserController {
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    List<UserDTO> getAllUser(){
        logger.info("Fetching all users");
        return userService.getAllUser();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    UserDTO saveUser(@Valid @RequestBody UserDTO userDTO){
        logger.info("Saving user with email: {}", userDTO.getEmail());
        return userService.saveUser(userDTO);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    void updateUser(@Valid @RequestBody UserDTO userDTO){
        logger.info("Updating user with email: {}", userDTO.getEmail());
        userService.updateUser(userDTO.getEmail(),userDTO);
    }

    @DeleteMapping(value = "/{email}",consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    void deleteUser(@PathVariable("email") String email){
        logger.info("Deleting user with email: {}", email);
        userService.deleteUser(email);
    }

    @PatchMapping(value = "/{email}/{role}",consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    UserDTO getUser(@PathVariable("email") String email, @PathVariable("role") Role role){
        logger.info("Fetching user details for email: {} with role: {}", email, role);
        return userService.getUserDetails(email ,role);
    }
}
