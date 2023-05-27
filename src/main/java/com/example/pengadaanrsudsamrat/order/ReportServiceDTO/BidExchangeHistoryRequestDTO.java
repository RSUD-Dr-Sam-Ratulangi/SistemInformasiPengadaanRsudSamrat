package com.example.pengadaanrsudsamrat.order.ReportServiceDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidExchangeHistoryRequestDTO {
    private Long orderId;
    private String orderDate;
    private List<BidItemDTO> bidItems;
    private String status;
}