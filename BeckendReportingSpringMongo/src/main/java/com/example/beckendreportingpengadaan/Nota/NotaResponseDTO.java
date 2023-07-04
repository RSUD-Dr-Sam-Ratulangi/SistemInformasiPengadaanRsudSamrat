package com.example.beckendreportingpengadaan.Nota;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class NotaResponseDTO {
    private String id;
    private String orderId;
    private List<MultipartFile> files;
    private List<String> fileUrls;
}
