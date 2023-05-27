package com.example.pengadaanrsudsamrat.bid.DTO;

import com.example.pengadaanrsudsamrat.ProductRequest.DTO.ProductRequestRequestDTO;
import com.example.pengadaanrsudsamrat.vendor.DTO.VendorResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Create bid response dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateBidResponseDTO {
    private Long id;
    private VendorResponseDTO vendor;
    private ProductRequestRequestDTO productRequest;
    private double price;
    private boolean selected;
    private String errorMessage;
}


