package com.example.beckendreportingpengadaan.image;

import com.example.beckendreportingpengadaan.image.DTO.CreateImageDTO;
import com.example.beckendreportingpengadaan.image.DTO.ResponseImageDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    ResponseImageDTO createImages(CreateImageDTO createImageDTO) throws IOException;
    List<ResponseImageDTO> getImagesByProductUuid(String productUuid);
}

