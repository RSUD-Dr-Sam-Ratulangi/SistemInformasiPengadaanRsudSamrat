package com.example.beckendreportingpengadaan.StatusEntry;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orderStatus")
public class OrderStatusModel {
    @Id
    private String id;
    private Long orderId;
    private List<StatusEntry> statusList = new ArrayList<>();

    public OrderStatusModel(String id, Long orderId) {
        this.id = id;
        this.orderId = orderId;
        this.statusList = new ArrayList<>();
    }

    public enum OrderStatus {
        ORDER,
        NEGOTIATION,
        CHECKING,
        VALIDATING,
        SHIPPING,
        PAYMENT,
        CANCEL,
        COMPLETE
    }

    // ... getters and setters
}
