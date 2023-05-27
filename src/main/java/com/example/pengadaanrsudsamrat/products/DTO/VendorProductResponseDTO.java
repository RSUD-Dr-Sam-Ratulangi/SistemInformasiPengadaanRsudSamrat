package com.example.pengadaanrsudsamrat.products.DTO;

import com.example.pengadaanrsudsamrat.products.ProductModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * The type Vendor product response dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorProductResponseDTO {
    private Long id;
    private String vendoruuid;
    private String name;
    private String address;
    private String phone;
    private List<ProductModel> products;
}
