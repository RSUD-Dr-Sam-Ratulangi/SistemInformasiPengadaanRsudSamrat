package com.example.pengadaanrsudsamrat.order.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopProductResponseDTO {
    private String productName;
    private String vendorName;
    private BigDecimal totalPurchase;
}

