package com.example.beckendreportingpengadaan.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "images")
public class ImageModel {
    @Id
    private String id;
    private String productId;
    private String productUuid;
    private List<Binary> images;
    private List<String> imageUrls;

}

