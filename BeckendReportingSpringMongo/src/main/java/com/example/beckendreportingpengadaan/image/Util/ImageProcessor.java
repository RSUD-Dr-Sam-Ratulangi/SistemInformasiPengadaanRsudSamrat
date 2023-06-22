package com.example.beckendreportingpengadaan.image.Util;

import org.bson.types.Binary;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ImageProcessor {
    public static final String BASE_URL = "http://rsudsamrat.site/images/";
    public static final String IMAGE_DIRECTORY = "/opt/lampp/htdocs/images";

    public List<String> generateImageUrls(List<Binary> images) {
        List<String> imageUrls = new ArrayList<>();

        for (Binary image : images) {
            String imageUrl = generateImageUrl(image);
            imageUrls.add(imageUrl);
        }

        return imageUrls;
    }

    public String generateImageUrl(Binary image) {
        String imageName = generateUniqueImageName(image);
        storeImage(image, imageName);
        return BASE_URL + imageName;
    }

    public String generateUniqueImageName(Binary image) {
        String uniqueImageName = UUID.randomUUID().toString();
        return uniqueImageName;
    }

    public void storeImage(Binary image, String imageName) {
        try {
            BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(image.getData()));
            File outputFile = new File(IMAGE_DIRECTORY + imageName + ".jpg");
            ImageIO.write(bufferedImage, "jpg", outputFile);
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception as per your requirements
        }
    }


}
