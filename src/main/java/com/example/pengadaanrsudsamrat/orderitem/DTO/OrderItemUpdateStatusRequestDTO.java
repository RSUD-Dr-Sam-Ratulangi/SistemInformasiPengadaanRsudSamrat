package com.example.pengadaanrsudsamrat.orderitem.dto;

import com.example.pengadaanrsudsamrat.orderitem.OrderItemModel;

public class OrderItemUpdateStatusRequestDTO {
    private Long orderItemId;
    private OrderItemModel.OrderItemStatus status;

    // Getters and setters
    public Long getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public OrderItemModel.OrderItemStatus getStatus() {
        return status;
    }

    public void setStatus(OrderItemModel.OrderItemStatus status) {
        this.status = status;
    }
}
