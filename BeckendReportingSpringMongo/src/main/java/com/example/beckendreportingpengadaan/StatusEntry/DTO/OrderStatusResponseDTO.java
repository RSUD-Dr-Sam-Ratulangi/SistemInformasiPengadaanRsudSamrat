package com.example.beckendreportingpengadaan.StatusEntry.DTO;

import com.example.beckendreportingpengadaan.StatusEntry.OrderStatusModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatusResponseDTO {
    private Long orderId;
    private List<StatusEntryDTO> statusList;
}
