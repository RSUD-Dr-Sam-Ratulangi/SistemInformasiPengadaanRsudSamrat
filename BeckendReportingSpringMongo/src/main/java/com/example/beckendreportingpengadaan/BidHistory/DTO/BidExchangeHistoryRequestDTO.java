package com.example.beckendreportingpengadaan.BidHistory.DTO;

import com.example.beckendreportingpengadaan.BidItems.BidItemDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidExchangeHistoryRequestDTO {
    private Long orderId; // Keep the type as Long
    private LocalDateTime orderDate;
    private List<BidItemDTO> bidItems;
    private String status;
}

