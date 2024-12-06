package lk.ijse.pesalax.cropmonitorapplication.controller;

import lk.ijse.pesalax.cropmonitorapplication.dto.impl.EquipmentDTO;
import lk.ijse.pesalax.cropmonitorapplication.exception.CropNotFoundException;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.exception.EquipmentNotFoundException;
import lk.ijse.pesalax.cropmonitorapplication.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/equipment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5501")
public class EquipmentController {
    private final EquipmentService equipmentService;
    private static final Logger logger = LoggerFactory.getLogger(EquipmentController.class);

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMINISTRATIVE')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveEquipment(@RequestBody EquipmentDTO equipment) {
        if (equipment == null) {
            logger.warn("Received null equipment payload.");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            try {
                logger.info("Saving equipment: {}", equipment);
                equipmentService.saveEquipment(equipment);
                logger.info("Equipment saved successfully.");
                return new ResponseEntity<>(HttpStatus.CREATED);
            } catch (DataPersistException e) {
                logger.error("DataPersistException occurred while saving equipment: {}", e.getMessage());
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                logger.error("Unexpected error occurred: {}", e.getMessage(), e);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @GetMapping(value = "allEquipment", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EquipmentDTO> getAllEquipment() {
        logger.info("Fetching all equipment.");
        return equipmentService.getAllEquipment();
    }

    @GetMapping()
    public ResponseEntity<List<EquipmentDTO>> searchEquipments(@RequestParam(value = "searchTerm", required = false) String searchTerm) {
        logger.info("Searching equipment with term: {}", searchTerm);
        List<EquipmentDTO> equipments = equipmentService.searchEquipment(searchTerm);
        logger.info("Found {} equipment(s).", equipments.size());
        return new ResponseEntity<>(equipments, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMINISTRATIVE')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteSelectedCrop(@PathVariable("id") String id) {
        try {
            logger.info("Deleting equipment with ID: {}", id);
            equipmentService.deleteEquipment(id);
            logger.info("Equipment deleted successfully.");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (CropNotFoundException e) {
            logger.warn("Equipment not found for ID: ", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Unexpected error during deletion: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMINISTRATIVE')")
    @PatchMapping(value = "/{equipmentId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateSelectedEquipment(@PathVariable("equipmentId") String equipmentId,
                                                        @RequestBody EquipmentDTO equipmentDTO) {
        try {
            logger.info("Updating equipment with ID: {}", equipmentId);
            equipmentService.updateEquipment(equipmentId, equipmentDTO);
            logger.info("Equipment updated successfully.");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EquipmentNotFoundException e) {
            logger.warn("Equipment not found for ID: {}", equipmentId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Unexpected error during update: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

