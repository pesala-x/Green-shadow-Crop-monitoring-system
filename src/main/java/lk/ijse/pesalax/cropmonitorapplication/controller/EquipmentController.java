package lk.ijse.pesalax.cropmonitorapplication.controller;

import lk.ijse.pesalax.cropmonitorapplication.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/v1/equipment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class EquipmentController {
    private final EquipmentService equipmentService;

}
