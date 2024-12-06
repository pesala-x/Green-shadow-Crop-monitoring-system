package lk.ijse.pesalax.cropmonitorapplication.controller;

import jakarta.servlet.http.HttpServletRequest;
import lk.ijse.pesalax.cropmonitorapplication.customObj.FieldErrorResponse;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.CropDTO;
import lk.ijse.pesalax.cropmonitorapplication.exception.CropNotFoundException;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.service.CropService;
import lk.ijse.pesalax.cropmonitorapplication.util.AppUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/crops")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5501")
public class CropController {

    private final CropService cropService;
    private static final Logger logger = LoggerFactory.getLogger(CropController.class);
    @PreAuthorize("hasAnyRole('MANAGER', 'SCIENTIST')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveCrop(
            @RequestParam("cropCode") String cropCode,
            @RequestParam("cropCommonName") String cropCommonName,
            @RequestParam("cropScientificName") String cropScientificName,
            @RequestParam("category") String category,
            @RequestParam("cropSeason") String cropSeason,
            @RequestParam("cropImage") MultipartFile cropImage,
            @RequestParam("fieldCode") String fieldCode,
            HttpServletRequest request

    ) {
        logger.info("Processing crop save request: cropCode={}, cropCommonName={}, category={}",
                cropCode, cropCommonName, category);
        logger.debug("Content-Type: {}", request.getContentType());

        request.getHeaderNames().asIterator().forEachRemaining(header ->
                logger.debug("{}: {}", header, request.getHeader(header))
        );

        try {
            byte[] byteFieldImage1 = cropImage.getBytes();
            String base64Image = AppUtil.toBase64(byteFieldImage1);

            CropDTO cropDTO = new CropDTO();
            cropDTO.setCropCode(cropCode);
            cropDTO.setCropCommonName(cropCommonName);
            cropDTO.setCropScientificName(cropScientificName);
            cropDTO.setCategory(category);
            cropDTO.setCropSeason(cropSeason);
            cropDTO.setCropImage(base64Image);
            cropDTO.setFieldCode(fieldCode);

            cropService.saveCrop(cropDTO);
            logger.info("Crop saved successfully!");

            return new ResponseEntity<>(new FieldErrorResponse(0,
                    "Crop saved successfully"), HttpStatus.CREATED);

        } catch (DataPersistException e) {
            logger.error("Error saving crop: {}", e.getMessage(), e);
            return new ResponseEntity<>(new FieldErrorResponse(0,
                    "Can't save: " + e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("Unexpected error while saving crop", e);
            return new ResponseEntity<>(new FieldErrorResponse(0,
                    "Internal server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "allcrops", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CropDTO> getAllCrops() {
        logger.info("Fetching all crops.");
        return cropService.getAllCrops();
    }

    @GetMapping()
    public ResponseEntity<List<CropDTO>> searchCrops(@RequestParam("searchTerm") String searchTerm) {
        logger.info("Searching crops with term: {}", searchTerm);

        try {
            List<CropDTO> crops = cropService.searchCrops(searchTerm);
            logger.info("Found {} crops matching the search term.", crops.size());
            return new ResponseEntity<>(crops, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error searching crops with term: {}", searchTerm, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'SCIENTIST')")
    @DeleteMapping(value = "/{code}")
    public ResponseEntity<Void> deleteSelectedCrop(@PathVariable("code") String code) {
        logger.info("Attempting to delete crop with code: {}", code);
        try {
            cropService.deleteCrop(code);
            logger.info("Successfully deleted crop with code: {}", code);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (CropNotFoundException e) {
            logger.warn("Crop not found: {}", code);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Unexpected error while deleting crop with code: {}", code, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'SCIENTIST')")
    @PatchMapping(value = "/{cropCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updateSelectedCrop(
            @PathVariable("cropCode") String cropCode,
            @RequestParam(value = "cropCommonName", required = false) String cropCommonName,
            @RequestParam(value = "cropScientificName", required = false) String cropScientificName,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "cropSeason", required = false) String cropSeason,
            @RequestParam(value = "cropImage", required = false) MultipartFile cropImage,
            @RequestParam(value = "fieldCode", required = false) String fieldCode
    ) {
        logger.info("Updating crop with code: {}", cropCode);
        try {
            CropDTO cropDTO = new CropDTO();

            if (cropCommonName != null) cropDTO.setCropCommonName(cropCommonName);
            if (cropScientificName != null) cropDTO.setCropScientificName(cropScientificName);
            if (category != null) cropDTO.setCategory(category);
            if (cropSeason != null) cropDTO.setCropSeason(cropSeason);

            if (cropImage != null && !cropImage.isEmpty()) {
                cropDTO.setCropImage(AppUtil.toBase64(cropImage.getBytes()));
            }

            if (fieldCode != null) cropDTO.setFieldCode(fieldCode);
            cropService.updateCrop(cropCode, cropDTO);
            logger.info("Successfully updated crop with code: {}", cropCode);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            logger.error("Error updating crop with code: {}", cropCode, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
