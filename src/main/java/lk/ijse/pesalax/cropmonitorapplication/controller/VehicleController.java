package lk.ijse.pesalax.cropmonitorapplication.controller;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.VehicleDTO;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.exception.VehicleNotFoundException;
import lk.ijse.pesalax.cropmonitorapplication.service.VehicleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/vehicles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5501")
@Slf4j
public class VehicleController {
    @Autowired
    private final VehicleService vehicleService;

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMINISTRATIVE')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveVehicle(@RequestBody VehicleDTO vehicleDTO) {
        log.info("Request received to save vehicle: {}", vehicleDTO);
        if (vehicleDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            try {
                vehicleService.saveVehicle(vehicleDTO);
                log.info("Vehicle saved successfully");
                return new ResponseEntity<>(HttpStatus.CREATED);
            } catch (DataPersistException e) {
                log.error(e.getMessage());
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                log.error(e.getMessage());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @GetMapping(value = "allVehicles", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<VehicleDTO> getAllVehicles() {
        log.info("Fetching all vehicles");
        return vehicleService.getAllVehicles();
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMINISTRATIVE')")
    @DeleteMapping(value = "/{code}")
    public ResponseEntity<Void> deleteSelectedVehicle(@PathVariable("code") String code) {
        try {
            vehicleService.deleteVehicle(code);
            log.info("Vehicle deleted successfully: {}", code);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (VehicleNotFoundException e) {
            log.warn("Vehicle not found: {}", code);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping()
    public ResponseEntity<List<VehicleDTO>> searchVehicles(@RequestParam(value = "searchTerm", required = false) String searchTerm) {
        log.info("Searching for vehicles with term: {}", searchTerm);
        List<VehicleDTO> vehicles = vehicleService.searchVehicles(searchTerm);
        log.info("Search completed. Found {} vehicles", vehicles.size());
        return new ResponseEntity<>(vehicles, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMINISTRATIVE')")
    @PatchMapping(value = "/{vehicleCode}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateSelectedVehicle(@PathVariable("vehicleCode") String vehicleCode, @RequestBody VehicleDTO vehicleDTO) {
        log.info("Request received to update vehicle with code: {}", vehicleCode);
        try {
            vehicleService.updateVehicle(vehicleCode, vehicleDTO);
            log.info("Vehicle updated successfully");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (VehicleNotFoundException e) {
            log.warn("Vehicle not found: ", vehicleCode);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
