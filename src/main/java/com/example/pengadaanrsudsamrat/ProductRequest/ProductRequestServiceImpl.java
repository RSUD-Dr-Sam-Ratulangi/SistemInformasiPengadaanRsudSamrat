package com.example.pengadaanrsudsamrat.ProductRequest;

import com.example.pengadaanrsudsamrat.ProductRequest.DTO.ProductRequestRequestDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * The type Product request service.
 */
@Service
public class ProductRequestServiceImpl implements ProductRequestService {

    private final ProductRequestRepository productRequestRepository;
    private final ModelMapper modelMapper;

    /**
     * Instantiates a new Product request service.
     *
     * @param productRequestRepository the product request repository
     * @param modelMapper              the model mapper
     */
    @Autowired
    public ProductRequestServiceImpl(ProductRequestRepository productRequestRepository, ModelMapper modelMapper) {
        this.productRequestRepository = productRequestRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ProductRequestRequestDTO> getAllProductRequests() {
        List<ProductRequestModel> productRequests = productRequestRepository.findAll();
        return productRequests.stream().map(pr -> modelMapper.map(pr, ProductRequestRequestDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ProductRequestRequestDTO getProductRequestById(Long id) {
        ProductRequestModel productRequest = productRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("Product request not found with id: " + id));
        return modelMapper.map(productRequest, ProductRequestRequestDTO.class);
    }

    @Override
    public ProductRequestRequestDTO createProductRequest(ProductRequestRequestDTO productRequestRequestDTO) {
        ProductRequestModel productRequest = modelMapper.map(productRequestRequestDTO, ProductRequestModel.class);
        productRequest.setCreatedAt(new Date());
        ProductRequestModel savedProductRequest = productRequestRepository.save(productRequest);
        return modelMapper.map(savedProductRequest, ProductRequestRequestDTO.class);
    }

    @Override
    public ProductRequestRequestDTO updateProductRequest(Long id, ProductRequestRequestDTO productRequestRequestDTO) {
        ProductRequestModel productRequestToUpdate = productRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("Product request not found with id: " + id));

        productRequestToUpdate.setName(productRequestRequestDTO.getName());
        productRequestToUpdate.setDescription(productRequestRequestDTO.getDescription());
        productRequestToUpdate.setPrice(productRequestRequestDTO.getPrice());
        productRequestToUpdate.setQuantity(productRequestRequestDTO.getQuantity());
        productRequestToUpdate.setImageUrl(productRequestRequestDTO.getImageUrl());
        productRequestToUpdate.setStatus(productRequestRequestDTO.getStatus());

        ProductRequestModel updatedProductRequest = productRequestRepository.save(productRequestToUpdate);
        return modelMapper.map(updatedProductRequest, ProductRequestRequestDTO.class);
    }

    @Override
    public void deleteProductRequest(Long id) {
        ProductRequestModel productRequestToDelete = productRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("Product request not found with id: " + id));
        productRequestRepository.delete(productRequestToDelete);
    }

}
