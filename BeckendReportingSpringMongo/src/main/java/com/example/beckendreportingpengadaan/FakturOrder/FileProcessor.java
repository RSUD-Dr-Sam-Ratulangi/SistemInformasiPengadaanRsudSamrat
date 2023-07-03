package com.example.beckendreportingpengadaan.FakturOrder;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Component
public class FileProcessor {
    public static final String BASE_URL = "http://rsudsamrat.site/files/";
    public static final String FILE_DIRECTORY = "/opt/lampp/htdocs/files/";

    public List<String> generateFileUrls(List<MultipartFile> files) throws IOException {
        List<String> fileUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            String fileName = generateUniqueFileName(file);
            String fileUrl = generateFileUrl(fileName);
            fileUrls.add(fileUrl);
            storeFile(file, fileName);
        }

        return fileUrls;
    }

    public String generateFileUrl(String fileName) {
        String fileUrl = BASE_URL + fileName;
        return fileUrl;
    }

    public String generateUniqueFileName(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        String extension = getExtension(originalFileName);
        String uniqueFileName = UUID.randomUUID().toString();
        return uniqueFileName + extension;
    }

    private String getExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
            return fileName.substring(dotIndex);
        }
        return "";
    }

    public String storeFile(MultipartFile file, String fileName) throws IOException {
        File directory = new File(FILE_DIRECTORY);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        File outputFile = new File(directory, fileName);
        file.transferTo(outputFile);
        return fileName;
    }


}
