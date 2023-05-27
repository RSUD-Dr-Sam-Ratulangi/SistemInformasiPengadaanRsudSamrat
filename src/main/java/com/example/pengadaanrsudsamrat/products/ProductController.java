package com.example.pengadaanrsudsamrat.products;

import com.example.pengadaanrsudsamrat.products.DTO.ProductRequestDTO;
import com.example.pengadaanrsudsamrat.products.DTO.ProductResponseDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * The type Product controller.
 */
@RestController
@RequestMapping("/pengadaan/dev/v1/products")
public class ProductController {

    private final ProductService productService;

    /**
     * Instantiates a new Product controller.
     *
     * @param productService the product service
     */
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * Gets all products.
     *
     * @param page the page
     * @param size the size
     * @return the all products
     */
    @GetMapping("/{page}/{size}")
    public ResponseEntity<Page<ProductResponseDTO>> getAllProducts(@PathVariable Integer page,
                                                                   @PathVariable Integer size) {
        Page<ProductResponseDTO> products = productService.findAllProducts(page, size);
        return ResponseEntity.ok(products);
    }

    /**
     * Gets product by uuid.
     *
     * @param uuid the uuid
     * @return the product by uuid
     */
    @GetMapping("/{uuid}")
    public ResponseEntity<ProductResponseDTO> getProductByUuid(@PathVariable String uuid) {
        Optional<ProductResponseDTO> product = productService.findProductByUuid(uuid);
        return ResponseEntity.of(product);
    }

    /**
     * Add product to vendor response entity.
     *
     * @param vendorUuid        the vendor uuid
     * @param productRequestDTO the product request dto
     * @return the response entity
     */
    @PostMapping("/{vendorUuid}")
    public ResponseEntity<ProductResponseDTO> addProductToVendor(@PathVariable String vendorUuid,
                                                                 @RequestBody ProductRequestDTO productRequestDTO) {
        ProductResponseDTO savedProduct = productService.addProductToVendor(vendorUuid, productRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    /**
     * Gets all products by vendor uuid.
     *
     * @param vendorUuid the vendor uuid
     * @return the all products by vendor uuid
     */
    @GetMapping("/vendor/{vendorUuid}")
    public ResponseEntity<List<ProductResponseDTO>> getAllProductsByVendorUuid(@PathVariable String vendorUuid) {
        List<ProductResponseDTO> products = productService.findAllProductsByVendorUuid(vendorUuid);
        return ResponseEntity.ok(products);
    }

    /**
     * Update product response entity.
     *
     * @param uuid              the uuid
     * @param productRequestDTO the product request dto
     * @return the response entity
     */
    @PutMapping("/{uuid}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable String uuid,
                                                            @RequestBody ProductRequestDTO productRequestDTO) {
        ProductResponseDTO updatedProduct = productService.updateProductByProductUUid(uuid, productRequestDTO);
        return ResponseEntity.ok(updatedProduct);
    }

    /**
     * Delete product by uuid response entity.
     *
     * @param uuid the uuid
     * @return the response entity
     */
    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteProductByUuid(@PathVariable String uuid) {
        productService.deleteProductByUuid(uuid);
        return ResponseEntity.noContent().build();
    }

    /**
     * Search products response entity.
     *
     * @param keyword the keyword
     * @param page    the page
     * @param size    the size
     * @return the response entity
     */
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponseDTO>> searchProducts(@RequestParam String keyword,
                                                                   @RequestParam(defaultValue = "0") Integer page,
                                                                   @RequestParam(defaultValue = "10") Integer size) {
        Page<ProductResponseDTO> products = productService.searchProducts(keyword, page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/filter-by-category")
    public Page<ProductResponseDTO> filterProductsByCategory(
            @RequestParam("categoryName") String categoryName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return productService.filterProductsByCategoryName(categoryName, page, size);
    }



}
