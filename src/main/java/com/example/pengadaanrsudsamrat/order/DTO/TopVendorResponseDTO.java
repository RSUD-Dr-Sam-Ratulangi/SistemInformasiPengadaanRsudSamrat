package com.example.pengadaanrsudsamrat.order.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopVendorResponseDTO {
    private String vendorName;
    private BigDecimal totalPurchase; // Adjusted the data type to BigDecimal
    private int totalOrders;
}