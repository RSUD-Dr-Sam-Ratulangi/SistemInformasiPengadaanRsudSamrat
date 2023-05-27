package com.example.pengadaanrsudsamrat.products;

import com.example.pengadaanrsudsamrat.products.DTO.ProductRequestDTO;
import com.example.pengadaanrsudsamrat.products.DTO.ProductResponseDTO;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

/**
 * The interface Product service.
 */
public interface ProductService {

    /**
     * Find all products page.
     *
     * @param page the page
     * @param size the size
     * @return the page
     */
    Page<ProductResponseDTO> findAllProducts(Integer page, Integer size);

    /**
     * Find product by uuid optional.
     *
     * @param uuid the uuid
     * @return the optional
     */
    Optional<ProductResponseDTO> findProductByUuid(String uuid);

    /**
     * Add product to vendor product response dto.
     *
     * @param vendorUuid        the vendor uuid
     * @param productRequestDTO the product request dto
     * @return the product response dto
     */
    ProductResponseDTO addProductToVendor(String vendorUuid, ProductRequestDTO productRequestDTO);

    /**
     * Find all products by vendor uuid list.
     *
     * @param vendorUuid the vendor uuid
     * @return the list
     */
    List<ProductResponseDTO> findAllProductsByVendorUuid(String vendorUuid);

    /**
     * Update product by product u uid product response dto.
     *
     * @param uuid              the uuid
     * @param productRequestDTO the product request dto
     * @return the product response dto
     */
    ProductResponseDTO updateProductByProductUUid(String uuid, ProductRequestDTO productRequestDTO);

    /**
     * Delete product by uuid.
     *
     * @param uuid the uuid
     */
    void deleteProductByUuid(String uuid);

    /**
     * Search products page.
     *
     * @param keyword the keyword
     * @param page    the page
     * @param size    the size
     * @return the page
     */
    Page<ProductResponseDTO> searchProducts(String keyword, int page, int size);

    Page<ProductResponseDTO> filterProductsByCategoryName(String categoryName, int page, int size);
}

