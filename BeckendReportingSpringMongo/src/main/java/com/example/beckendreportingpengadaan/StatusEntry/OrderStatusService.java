package com.example.beckendreportingpengadaan.StatusEntry;


import com.example.beckendreportingpengadaan.StatusEntry.DTO.OrderStatusRequestDTO;
import com.example.beckendreportingpengadaan.StatusEntry.DTO.OrderStatusResponseDTO;

import java.util.List;

public interface OrderStatusService {
    OrderStatusResponseDTO createOrderStatus(OrderStatusRequestDTO requestDTO);

    OrderStatusResponseDTO getOrderStatusByOrderId(Long orderId);
    OrderStatusResponseDTO addStatusToOrder(Long orderId, OrderStatusModel.OrderStatus status);
}
