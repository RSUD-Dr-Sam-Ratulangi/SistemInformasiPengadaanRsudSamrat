package com.example.pengadaanrsudsamrat.bid.DTO;

import com.example.pengadaanrsudsamrat.ProductRequest.ProductRequestModel;
import com.example.pengadaanrsudsamrat.vendor.VendorModel;
import com.example.pengadaanrsudsamrat.vendor.VendorModelSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Bid response dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidResponseDTO {
    private Long id;

    @JsonSerialize(using = VendorModelSerializer.class)
    private VendorModel vendor;
    private ProductRequestModel productRequest;
    private Double price;
    private Boolean selected;

    // getters and setters
    // ...
}

