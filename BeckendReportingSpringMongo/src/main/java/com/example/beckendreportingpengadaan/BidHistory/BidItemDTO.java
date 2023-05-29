package com.example.beckendreportingpengadaan.BidHistory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidItemDTO {
    private Long id;
    private String productName;
    private String vendorName;
    private Double originalPrice;
    private Double bidPrice;
    private Double bidPriceChange;
    private Double totalBidPrice;
    private String status;
}

