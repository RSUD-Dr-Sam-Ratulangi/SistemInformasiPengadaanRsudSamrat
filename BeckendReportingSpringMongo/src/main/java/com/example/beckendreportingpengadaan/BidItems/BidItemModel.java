package com.example.beckendreportingpengadaan.BidItems;

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
    private String message;


    public enum BidItemStatus {
        PENDING,
        OFFER,
        REJECTED,
        ACCEPTED
    }
    // ... getters and setters
}
