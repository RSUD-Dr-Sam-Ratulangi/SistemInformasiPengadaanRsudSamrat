package com.example.beckendreportingpengadaan.StatusEntry.DTO;

import com.example.beckendreportingpengadaan.StatusEntry.OrderStatusModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusEntryDTO {
    private OrderStatusModel.OrderStatus status;
    private LocalDateTime timestamp;
}