package lk.ijse.pesalax.cropmonitorapplication.controller;

import jakarta.servlet.http.HttpServletRequest;
import lk.ijse.pesalax.cropmonitorapplication.customObj.FieldErrorResponse;
import lk.ijse.pesalax.cropmonitorapplication.customObj.FieldResponse;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.FieldDTO;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.exception.FieldNotFoundException;
import lk.ijse.pesalax.cropmonitorapplication.service.FieldService;
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
@RequestMapping(value = "api/v1/fields")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5501")
public class FieldController {
    private final FieldService fieldService;
    private static final Logger logger = LoggerFactory.getLogger(FieldController.class);

    @PreAuthorize("hasAnyRole('MANAGER', 'SCIENTIST')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveField(
            @RequestParam("fieldCode") String fieldCode,
            @RequestParam("fieldName") String fieldName,
            @RequestParam("fieldLocation") String fieldLocation,
            @RequestParam("extentSize") Double extentSize,
            @RequestParam("fieldImage1") MultipartFile fieldImage1,
            @RequestParam("fieldImage2") MultipartFile fieldImage2,
            HttpServletRequest request
    ) {
        logger.info("Received request to save field. Content-Type: {}", request.getContentType());
        request.getHeaderNames().asIterator().forEachRemaining(header ->
                logger.debug("Header: {} = {}", header, request.getHeader(header))
        );

        try {
            logger.info("Saving field with FieldCode: {}, FieldName: {}", fieldCode, fieldName);
            byte[] byteFieldImage1 = fieldImage1.getBytes();
            String base64Image1 = AppUtil.toBase64(byteFieldImage1);

            byte[] byteFieldImage2 = fieldImage2.getBytes();
            String base64Image2 = AppUtil.toBase64(byteFieldImage2);

            FieldDTO fieldDTO = new FieldDTO();
            fieldDTO.setFieldCode(fieldCode);
            fieldDTO.setFieldName(fieldName);
            fieldDTO.setFieldLocation(fieldLocation);
            fieldDTO.setExtentSize(extentSize);
            fieldDTO.setFieldImage1(base64Image1);
            fieldDTO.setFieldImage2(base64Image2);

            fieldService.saveField(fieldDTO);
            logger.info("Field saved successfully with code: {}", fieldCode);

            return new ResponseEntity<>(new FieldErrorResponse(0,
                    "Field saved successfully"), HttpStatus.CREATED);

        } catch (DataPersistException e) {
            logger.error("Failed to save field: {}", e.getMessage(), e);
            return new ResponseEntity<>(new FieldErrorResponse(0,
                    "Failed to save field: " + e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("Internal server error: ", e);
            return new ResponseEntity<>(new FieldErrorResponse(0,
                    "Internal server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "allFields", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<FieldDTO> getAllFields() {
        logger.info("Fetching all fields.");
        return fieldService.getAllFields();
    }

    @GetMapping()
    public ResponseEntity<List<FieldDTO>> getSelectedField(@RequestParam("searchTerm") String searchTerm) {
        List<FieldDTO> fields = fieldService.getSelectedField(searchTerm);
        logger.info("Fetching field with code: {}", searchTerm);
        return new ResponseEntity<>(fields, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'SCIENTIST')")
    @PatchMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, value = "/{fieldCode}")
    public ResponseEntity<Void> updateSelectedField(
            @PathVariable("fieldCode") String fieldCode,
            @RequestParam(value = "fieldName", required = false) String fieldName,
            @RequestParam(value = "fieldLocation", required = false) String fieldLocation,
            @RequestParam(value = "extentSize", required = false) Double extentSize,
            @RequestParam(value = "fieldImage1", required = false) MultipartFile fieldImage1,
            @RequestParam(value = "fieldImage2", required = false) MultipartFile fieldImage2
    ) {
        logger.info("Updating field with code: {}", fieldCode);
        try {
            FieldDTO fieldDTO = new FieldDTO();

            if (fieldName != null) fieldDTO.setFieldName(fieldName);
            if (fieldLocation != null) fieldDTO.setFieldLocation(fieldLocation);
            if (extentSize != null) fieldDTO.setExtentSize(extentSize);

            if (fieldImage1 != null && !fieldImage1.isEmpty()) {
                fieldDTO.setFieldImage1(AppUtil.toBase64(fieldImage1.getBytes()));
                logger.info("Field image 1 updated for field code: {}", fieldCode);
            }
            if (fieldImage2 != null && !fieldImage2.isEmpty()) {
                fieldDTO.setFieldImage2(AppUtil.toBase64(fieldImage2.getBytes()));
                logger.info("Field image 2 updated for field code: {}", fieldCode);
            }

            fieldService.updateField(fieldCode, fieldDTO);
            logger.info("Successfully updated field with code: {}", fieldCode);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            logger.error("Error updating field with code {}: {}", fieldCode, e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'SCIENTIST')")
    @DeleteMapping(value = "/{code}")
    public ResponseEntity<Void> deleteSelectedField(@PathVariable("code") String code) {
        logger.info("Attempting to delete field with code: {}", code);
        try {
            fieldService.deleteField(code);
            logger.info("Field deleted successfully.", code);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (FieldNotFoundException e) {
            logger.warn("Field with code {} not found: {}", code, e.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error deleting field with code {}: {}", code, e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

