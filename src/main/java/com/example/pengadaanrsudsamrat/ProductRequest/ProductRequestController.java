package com.example.pengadaanrsudsamrat.ProductRequest;

import com.example.pengadaanrsudsamrat.ProductRequest.DTO.ProductRequestRequestDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The type Product request controller.
 */
@RestController
@RequestMapping("/pengadaan/dev/v1//product-requests")
public class ProductRequestController {

    private final ProductRequestService productRequestService;
    private final ModelMapper modelMapper;

    /**
     * Instantiates a new Product request controller.
     *
     * @param productRequestService the product request service
     * @param modelMapper           the model mapper
     */
    @Autowired
    public ProductRequestController(ProductRequestService productRequestService, ModelMapper modelMapper) {
        this.productRequestService = productRequestService;
        this.modelMapper = modelMapper;
    }

    /**
     * Gets all product requests.
     *
     * @return the all product requests
     */
    @GetMapping
    public ResponseEntity<List<ProductRequestRequestDTO>> getAllProductRequests() {
        List<ProductRequestRequestDTO> productRequests = productRequestService.getAllProductRequests();
        return ResponseEntity.ok(productRequests);
    }

    /**
     * Gets product request by id.
     *
     * @param id the id
     * @return the product request by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductRequestRequestDTO> getProductRequestById(@PathVariable Long id) {
        ProductRequestRequestDTO productRequest = productRequestService.getProductRequestById(id);
        return ResponseEntity.ok(productRequest);
    }

    /**
     * Create product request response entity.
     *
     * @param productRequestRequestDTO the product request request dto
     * @return the response entity
     */
    @PostMapping
    public ResponseEntity<ProductRequestRequestDTO> createProductRequest(@RequestBody ProductRequestRequestDTO productRequestRequestDTO) {
        ProductRequestRequestDTO createdProductRequest = productRequestService.createProductRequest(productRequestRequestDTO);
        return new ResponseEntity<>(createdProductRequest, HttpStatus.CREATED);
    }

    /**
     * Update product request response entity.
     *
     * @param id                       the id
     * @param productRequestRequestDTO the product request request dto
     * @return the response entity
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductRequestRequestDTO> updateProductRequest(@PathVariable Long id, @RequestBody ProductRequestRequestDTO productRequestRequestDTO) {
        ProductRequestRequestDTO updatedProductRequest = productRequestService.updateProductRequest(id, productRequestRequestDTO);
        return ResponseEntity.ok(updatedProductRequest);
    }

    /**
     * Delete product request response entity.
     *
     * @param id the id
     * @return the response entity
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductRequest(@PathVariable Long id) {
        productRequestService.deleteProductRequest(id);
        return ResponseEntity.noContent().build();
    }
}
