package com.example.pengadaanrsudsamrat.order.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemProductInOrderRavanueAndStockResponseDTO {

    private Long productId;
    private String productName;
    private String vendorName;
    private Integer orderItemQuantity;
    private Integer productQuantity;
    private Integer productTotalStock;
    private Double productPrice;
    private Double totalRevenue;
    private Integer totalStockExchange;
    private Double totalOrderRevenue;
}
