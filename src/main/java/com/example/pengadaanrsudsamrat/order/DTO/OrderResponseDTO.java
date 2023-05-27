package com.example.pengadaanrsudsamrat.order.DTO;

import com.example.pengadaanrsudsamrat.order.OrderModel;
import com.example.pengadaanrsudsamrat.orderitem.DTO.OrderItemResponseDTO;
import com.example.pengadaanrsudsamrat.payment.DTO.PaymentDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * The type Order response dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {

    private Long id;
    private LocalDateTime orderDate;
    private List<OrderItemResponseDTO> orderItems;
    private PaymentDTO payment;
    private OrderModel.OrderStatus status;

    // constructors, getters, and setters

}