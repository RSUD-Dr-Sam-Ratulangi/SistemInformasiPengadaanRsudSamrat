package com.example.beckendreportingpengadaan.image.Util;

import org.bson.types.Binary;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ImageProcessor {
    public static final String BASE_URL = "https://rsudsamrat.site/images/";
    public static final String IMAGE_DIRECTORY = "/opt/lampp/htdocs/images/";

    public List<String> generateImageUrls(List<Binary> images) throws IOException {
        List<String> imageUrls = new ArrayList<>();

        for (Binary image : images) {
            String imageName = generateUniqueImageName(image);
            String imageUrl = generateImageUrl(imageName);
            imageUrls.add(imageUrl);
            storeImage(image, imageName);
        }

        return imageUrls;
    }

    public String generateImageUrl(String imageName) {
        String imageUrl = BASE_URL + imageName + ".jpg";
        return imageUrl;
    }

    public String generateUniqueImageName(Binary image) {
        String uniqueImageName = UUID.randomUUID().toString();
        return uniqueImageName;
    }

    public String storeImage(Binary image, String imageName) throws IOException {
        BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(image.getData()));
        File directory = new File(IMAGE_DIRECTORY);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        File outputFile = new File(directory, imageName + ".jpg");
        ImageIO.write(bufferedImage, "jpg", outputFile);
        return imageName;
    }
}
