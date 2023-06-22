package com.example.beckendreportingpengadaan.image;

import com.example.beckendreportingpengadaan.image.DTO.CreateImageDTO;
import com.example.beckendreportingpengadaan.image.DTO.ResponseImageDTO;
import org.bson.types.Binary;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;



@Service
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository, ModelMapper modelMapper) {
        this.imageRepository = imageRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ResponseImageDTO createImages(CreateImageDTO createImageDTO) {
        List<Binary> imageList = new ArrayList<>();

        for (MultipartFile imageFile : createImageDTO.getImages()) {
            if (!imageFile.isEmpty()) {
                try {
                    byte[] fileBytes = imageFile.getBytes();
                    imageList.add(new Binary(fileBytes));
                } catch (IOException e) {
                    e.printStackTrace();
                    // Handle the exception as per your requirements
                }
            }
        }

        ImageModel image = new ImageModel();
        image.setProductId(createImageDTO.getProductId());
        image.setProductUuid(createImageDTO.getProductUuid());
        image.setImages(imageList);

        image = imageRepository.save(image);

        return modelMapper.map(image, ResponseImageDTO.class);
    }


    @Override
    public List<ResponseImageDTO> getImagesByProductUuid(String productUuid) {
        List<ImageModel> images = imageRepository.findByProductUuid(productUuid);
        List<ResponseImageDTO> responseDTOList = new ArrayList<>();

        for (ImageModel image : images) {
            ResponseImageDTO responseDTO = modelMapper.map(image, ResponseImageDTO.class);
            responseDTOList.add(responseDTO);
        }

        return responseDTOList;
    }

}

