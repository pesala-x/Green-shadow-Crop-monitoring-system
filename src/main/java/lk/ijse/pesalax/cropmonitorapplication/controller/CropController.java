package lk.ijse.pesalax.cropmonitorapplication.controller;

import jakarta.servlet.http.HttpServletRequest;
import lk.ijse.pesalax.cropmonitorapplication.customObj.FieldErrorResponse;
import lk.ijse.pesalax.cropmonitorapplication.dto.impl.CropDTO;
import lk.ijse.pesalax.cropmonitorapplication.exception.DataPersistException;
import lk.ijse.pesalax.cropmonitorapplication.service.CropService;
import lk.ijse.pesalax.cropmonitorapplication.util.AppUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/crops")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class CropController {
    private final CropService cropService;

    //    --Save Crop--
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
        System.out.println("Content-Type: " + request.getContentType());
        request.getHeaderNames().asIterator().forEachRemaining(header ->
                System.out.println(header + ": " + request.getHeader(header)));

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

            return new ResponseEntity<>(new FieldErrorResponse(0,
                    "Crop saved successfully"), HttpStatus.CREATED);

        } catch (DataPersistException e) {
            return new ResponseEntity<>(new FieldErrorResponse(0,
                    "Can't save: " + e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new FieldErrorResponse(0,
                    "Internal server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "allcrops", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CropDTO> getAllCrops() {
        return cropService.getAllCrops();
    }

    @GetMapping()
    public ResponseEntity<List<CropDTO>> searchCrops(
            @RequestParam(value = "cropCode", required = false) String cropCode,
            @RequestParam(value = "cropCommonName", required = false) String cropCommonName) {
        List<CropDTO> crops = cropService.searchCrops(cropCode, cropCommonName);
        return new ResponseEntity<>(crops, HttpStatus.OK);
    }

}
