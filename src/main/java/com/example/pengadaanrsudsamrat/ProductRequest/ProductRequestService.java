package com.example.pengadaanrsudsamrat.ProductRequest;


import com.example.pengadaanrsudsamrat.ProductRequest.DTO.ProductRequestRequestDTO;

import java.util.List;

/**
 * The interface Product request service.
 */
public interface ProductRequestService {
    /**
     * Gets all product requests.
     *
     * @return the all product requests
     */
    List<ProductRequestRequestDTO> getAllProductRequests();

    /**
     * Gets product request by id.
     *
     * @param id the id
     * @return the product request by id
     */
    ProductRequestRequestDTO getProductRequestById(Long id);

    /**
     * Create product request product request request dto.
     *
     * @param productRequestRequestDTO the product request request dto
     * @return the product request request dto
     */
    ProductRequestRequestDTO createProductRequest(ProductRequestRequestDTO productRequestRequestDTO);

    /**
     * Update product request product request request dto.
     *
     * @param id                       the id
     * @param productRequestRequestDTO the product request request dto
     * @return the product request request dto
     */
    ProductRequestRequestDTO updateProductRequest(Long id, ProductRequestRequestDTO productRequestRequestDTO);

    /**
     * Delete product request.
     *
     * @param id the id
     */
    void deleteProductRequest(Long id);
}

