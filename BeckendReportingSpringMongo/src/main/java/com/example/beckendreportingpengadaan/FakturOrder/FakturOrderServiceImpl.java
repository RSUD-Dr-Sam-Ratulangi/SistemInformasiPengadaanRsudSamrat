package com.example.beckendreportingpengadaan.FakturOrder;

import org.bson.types.Binary;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class FakturOrderServiceImpl implements FakturOrderService {

    private final FakturOrderRepository fakturOrderRepository;
    private final FileProcessor fileProcessor;
    private final ModelMapper modelMapper;

    public FakturOrderServiceImpl(FakturOrderRepository fakturOrderRepository, FileProcessor fileProcessor, ModelMapper modelMapper) {
        this.fakturOrderRepository = fakturOrderRepository;
        this.fileProcessor = fileProcessor;
        this.modelMapper = modelMapper;
    }


    @Override
    public ResponseFakturOrderDTO createFakturOrder(CreateFakturOrderDTO createDTO) throws IOException {
        // Convert MultipartFiles to Binaries
        List<Binary> binaries = convertMultipartFilesToBinaries(createDTO.getFiles());

        // Generate file URLs based on the saved file data
        List<String> fileUrls = fileProcessor.generateFileUrls(createDTO.getFiles());

        // Create and save the FakturOrder
        FakturOrder fakturOrder = new FakturOrder();
        fakturOrder.setOrderId(createDTO.getOrderId());
        fakturOrder.setFiles(binaries);
        fakturOrder.setFileUrls(fileUrls);
        fakturOrderRepository.save(fakturOrder);

        // Create and return the response DTO
        ResponseFakturOrderDTO responseDTO = new ResponseFakturOrderDTO();
        responseDTO.setId(fakturOrder.getId());
        responseDTO.setOrderId(fakturOrder.getOrderId());
        responseDTO.setFiles(createDTO.getFiles());
        responseDTO.setFileUrls(fileUrls);

        return responseDTO;
    }

    private List<Binary> convertMultipartFilesToBinaries(List<MultipartFile> files) throws IOException {
        List<Binary> binaries = new ArrayList<>();

        for (MultipartFile file : files) {
            byte[] fileBytes = file.getBytes();
            binaries.add(new Binary(fileBytes));
        }

        return binaries;
    }



}
