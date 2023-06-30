package com.example.beckendreportingpengadaan.StatusEntry.DTO;

import com.example.beckendreportingpengadaan.StatusEntry.OrderStatusModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatusRequestDTO {
    private Long orderId;
    @NotNull
    private OrderStatusModel.OrderStatus status;
    @NotNull
    private LocalDateTime timestamp;
}
