package com.example.pengadaanrsudsamrat.products.DTO;

import com.example.pengadaanrsudsamrat.products.DTO.ProductResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The type Vendor product request dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorProductRequestDTO {

    private String vendoruuid;

    @NotBlank
    private String name;

    @NotBlank
    private String address;

    @NotBlank
    private String phone;

    @NotNull
    private List<ProductResponseDTO> products;
}
