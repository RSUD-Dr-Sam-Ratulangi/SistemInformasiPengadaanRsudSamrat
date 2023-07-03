package com.example.beckendreportingpengadaan.StatusEntry;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
class StatusEntry {
    private OrderStatusModel.OrderStatus status;
    private LocalDateTime timestamp;
}
