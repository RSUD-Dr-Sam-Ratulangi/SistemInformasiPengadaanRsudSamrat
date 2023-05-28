package com.example.beckendreportingpengadaan.BidHistory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidItemModel {
    private Long id;
    private String productName;
    private String vendorName;
    private Double originalPrice;
    private Double bidPrice;
    private Double bidPriceChange;
    private Double totalBidPrice;
    private BidItemStatus status;


    public enum BidItemStatus {
        PENDING,
        OFFER,
        REJECTED,
        ACCEPTED
    }
    // ... getters and setters
}
