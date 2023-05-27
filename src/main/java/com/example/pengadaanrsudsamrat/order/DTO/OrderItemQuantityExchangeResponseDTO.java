package com.example.pengadaanrsudsamrat.order.DTO;


import com.example.pengadaanrsudsamrat.order.OrderModel;
import com.example.pengadaanrsudsamrat.products.DTO.ProductResponseDTO;
import com.example.pengadaanrsudsamrat.vendor.DTO.VendorResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemQuantityExchangeResponseDTO {

    private Long orderId;
    private Long orderItemId;
    private VendorResponseDTO vendor;
    private ProductResponseDTO product;
    private int productQuantity;
    private int orderItemQuantity;
    private int productTotalStock;
    private LocalDateTime orderDate;
    private OrderModel.OrderStatus status;
}
