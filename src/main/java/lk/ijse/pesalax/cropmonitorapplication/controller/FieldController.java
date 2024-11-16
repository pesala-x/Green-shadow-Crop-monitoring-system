package lk.ijse.pesalax.cropmonitorapplication.controller;

import jakarta.servlet.http.HttpServletRequest;
import lk.ijse.pesalax.cropmonitorapplication.customObj.FieldErrorResponse;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.FieldDTO;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.service.FieldService;
import lk.ijse.pesalax.cropmonitorapplication.util.AppUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/fields")
@RequiredArgsConstructor
public class FieldController {
    private final FieldService fieldService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FieldErrorResponse> saveField(
            @RequestParam("fieldCode") String fieldCode,
            @RequestParam("fieldName") String fieldName,
            @RequestParam("fieldLocation") String fieldLocation,
            @RequestParam("extentSize") Double extentSize,
            @RequestParam("fieldImage1") MultipartFile fieldImage1,
            @RequestParam("fieldImage2") MultipartFile fieldImage2,
            HttpServletRequest request // Add this to log the request content type

    ) {
        System.out.println("Content-Type: " + request.getContentType());
        request.getHeaderNames().asIterator().forEachRemaining(header ->
                System.out.println(header + ": " + request.getHeader(header)));

        try {
            // Log incoming data
            System.out.println("FieldCode: " + fieldCode);
            System.out.println("FieldName: " + fieldName);
            System.out.println("FieldLocation: " + fieldLocation);
            System.out.println("ExtentSize: " + extentSize);
            System.out.println("FieldImage1: " + fieldImage1.getOriginalFilename());
            System.out.println("FieldImage2: " + fieldImage2.getOriginalFilename());

            // Convert images to Base64
            byte[] byteFieldImage1 = fieldImage1.getBytes();
            String base64Image1 = AppUtil.toBase64(byteFieldImage1);

            byte[] byteFieldImage2 = fieldImage2.getBytes();
            String base64Image2 = AppUtil.toBase64(byteFieldImage2);

            // Build DTO
            FieldDTO fieldDTO = new FieldDTO();
            fieldDTO.setFieldCode(fieldCode);
            fieldDTO.setFieldName(fieldName);
            fieldDTO.setFieldLocation(fieldLocation);
            fieldDTO.setExtentSize(extentSize);
            fieldDTO.setFieldImage1(base64Image1);
            fieldDTO.setFieldImage2(base64Image2);

            // Save field via service
            fieldService.saveField(fieldDTO);

            // Return success response
            return new ResponseEntity<>(new FieldErrorResponse("success", "Field saved successfully"), HttpStatus.CREATED);

        } catch (DataPersistException e) {
            // Handle specific persistence error
            return new ResponseEntity<>(new FieldErrorResponse("error", "Failed to save field: " + e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Handle general exceptions
            e.printStackTrace(); // Log the error
            return new ResponseEntity<>(new FieldErrorResponse("error", "Internal server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "allFields", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<FieldDTO> getAllFields() {
        return fieldService.getAllFields();
    }
}

