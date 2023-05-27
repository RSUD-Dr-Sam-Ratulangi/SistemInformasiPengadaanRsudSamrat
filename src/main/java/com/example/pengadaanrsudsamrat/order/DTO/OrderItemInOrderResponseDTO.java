package com.example.pengadaanrsudsamrat.order.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemInOrderResponseDTO {
    private Long orderId; // from OrderResponseDTO
    private Long orderItemId; // from OrderItemResponseDTO.getId
    private Long vendorId; // from OrderItemResponseDTO.getVendor.getId()
    private Long productId; // from OrderItemResponseDTO.getProduct.getID
    private int productQuantity; // from OrderItemResponseDTO.getProduct.getQuantity
    private int orderItemQuantity; // from OrderItemResponseDTO.getQuantity
    private BigDecimal amountPerItem; // from OrderItemResponseDTO.getProduct.getPrice()
    private LocalDateTime orderDate; // from OrderDateResponseDTO.getOrderDate()
}
