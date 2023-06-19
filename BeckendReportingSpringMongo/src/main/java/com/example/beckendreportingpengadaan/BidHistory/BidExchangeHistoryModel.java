package com.example.beckendreportingpengadaan.BidHistory;

import com.example.beckendreportingpengadaan.BidItems.BidItemModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "bidExchangeHistory")
public class BidExchangeHistoryModel {
    @Id
    private String id;
    private Long orderId;
    private LocalDateTime orderDate;
    private List<BidItemModel> bidItems;
    private OrderStatus status;


    // ... getters and setters

    public enum OrderStatus {
        NEGOTIATION,
        CHECKING,
        VALIDATING,
        SHIPING,
        PAYMENT,
        CANCEL,
        COMPLETE,
    }
}




