package com.example.beckendreportingpengadaan.image.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResponseImageDTO {
    private String id;
    private String productId;
    private String productUuid;
    private List<String> imageUrls;

    // Constructors, getters, and setters
}

