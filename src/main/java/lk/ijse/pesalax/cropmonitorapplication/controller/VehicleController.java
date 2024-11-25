package lk.ijse.pesalax.cropmonitorapplication.controller;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.VehicleDTO;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/v1/vehicles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5501")
public class VehicleController {
    private final VehicleService vehicleService;

}
