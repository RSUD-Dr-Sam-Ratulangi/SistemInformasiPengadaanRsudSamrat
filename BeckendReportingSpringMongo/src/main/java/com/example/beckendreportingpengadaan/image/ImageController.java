package com.example.beckendreportingpengadaan.image;

import com.example.beckendreportingpengadaan.image.DTO.CreateImageDTO;
import com.example.beckendreportingpengadaan.image.DTO.ResponseImageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping
    public ResponseEntity<ResponseImageDTO> createImages(@RequestParam("product_id") String productId,
                                                         @RequestParam("product_uuid") String productUuid,
                                                         @RequestParam("images") MultipartFile[] images) throws IOException {
        CreateImageDTO createImageDTO = new CreateImageDTO(productId, productUuid, List.of(images));
        ResponseImageDTO responseDTO = imageService.createImages(createImageDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{product_uuid}")
    public ResponseEntity<List<ResponseImageDTO>> getImagesByProductUuid(@PathVariable("product_uuid") String productUuid) {
        List<ResponseImageDTO> responseDTOList = imageService.getImagesByProductUuid(productUuid);
        return ResponseEntity.ok(responseDTOList);
    }
}

