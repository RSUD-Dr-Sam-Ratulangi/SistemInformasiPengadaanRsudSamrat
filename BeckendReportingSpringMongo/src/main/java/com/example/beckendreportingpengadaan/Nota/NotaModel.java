package com.example.beckendreportingpengadaan.Nota;

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
@Document(collection = "Nota")
public class NotaModel {
    @Id
    private String id;
    private String orderId;
    private List<Binary> files;
    private List<String> fileUrls;
}
