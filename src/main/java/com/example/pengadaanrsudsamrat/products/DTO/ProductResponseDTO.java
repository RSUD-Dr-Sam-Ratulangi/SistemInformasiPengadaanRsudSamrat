package com.example.pengadaanrsudsamrat.products.DTO;

import com.example.pengadaanrsudsamrat.Category.DTO.CategoryResponseDTO;
import com.example.pengadaanrsudsamrat.vendor.DTO.VendorResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * The type Product response dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
    private Long id;
    private String productuuid;
    private String name;
    private String description;
    private double price;
    private int quantity;
    private VendorResponseDTO vendor;
    private Set<CategoryResponseDTO> categories;
    private String imageUrl;

}
