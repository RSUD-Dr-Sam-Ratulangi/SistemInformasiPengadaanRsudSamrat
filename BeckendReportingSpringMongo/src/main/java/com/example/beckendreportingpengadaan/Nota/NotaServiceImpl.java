package com.example.beckendreportingpengadaan.Nota;

import com.example.beckendreportingpengadaan.Exception.EntityNotFoundException;
import com.example.beckendreportingpengadaan.FakturOrder.FileProcessor;
import org.bson.types.Binary;
import org.modelmapper.ModelMapper;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotaServiceImpl implements NotaService {

    private final NotaRepository notaRepository;
    private final FileProcessor fileProcessor;
    private final ModelMapper modelMapper;

    public NotaServiceImpl(NotaRepository notaRepository, FileProcessor fileProcessor, ModelMapper modelMapper) {
        this.notaRepository = notaRepository;
        this.fileProcessor = fileProcessor;
        this.modelMapper = modelMapper;
    }

    @Override
    public NotaResponseDTO createNota(NotaRequestDTO requestDTO) throws IOException {
        // Check if the orderId already exists
        NotaModel existingNota = notaRepository.findByOrderId(requestDTO.getOrderId());
        if (existingNota != null) {
            throw new EntityAlreadyExistsException("Nota already exists for orderId: " + requestDTO.getOrderId());
        }

        // Convert MultipartFiles to Binaries
        List<Binary> binaries = convertMultipartFilesToBinaries(requestDTO.getFiles());

        // Generate file URLs based on the saved file data
        List<String> fileUrls = fileProcessor.generateFileUrls(requestDTO.getFiles());

        // Create and save the Nota
        NotaModel nota = new NotaModel();
        nota.setOrderId(requestDTO.getOrderId());
        nota.setFiles(binaries);
        nota.setFileUrls(fileUrls);
        notaRepository.save(nota);

        // Create and return the response DTO
        NotaResponseDTO responseDTO = new NotaResponseDTO();
        responseDTO.setId(nota.getId());
        responseDTO.setOrderId(nota.getOrderId());
        responseDTO.setFiles(requestDTO.getFiles());
        responseDTO.setFileUrls(fileUrls);

        return responseDTO;
    }


    @Override
    public NotaResponseDTO getByOrderId(String orderId) {
        NotaModel nota = notaRepository.findByOrderId(orderId);
        if (nota == null) {
            throw new EntityNotFoundException("Nota not found for orderId: " + orderId);
        }

        // Create the response DTO
        NotaResponseDTO responseDTO = new NotaResponseDTO();
        responseDTO.setId(nota.getId());
        responseDTO.setOrderId(nota.getOrderId());
        responseDTO.setFileUrls(nota.getFileUrls());

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
