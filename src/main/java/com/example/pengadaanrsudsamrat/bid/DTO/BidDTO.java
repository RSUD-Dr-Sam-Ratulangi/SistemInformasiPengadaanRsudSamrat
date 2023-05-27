package com.example.pengadaanrsudsamrat.bid.DTO;

import com.example.pengadaanrsudsamrat.vendor.VendorModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Bid dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidDTO {
    private Long id;
    private double price;
    private Long vendorId;
    private Long productRequestId;
    private boolean selected;
}

