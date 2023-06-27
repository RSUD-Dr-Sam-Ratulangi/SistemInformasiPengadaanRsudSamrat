package com.example.beckendreportingpengadaan.image.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateImageDTO {
    private String productId;
    private String productUuid;
    private List<MultipartFile> images;

    // Constructors, getters, and setters
}

