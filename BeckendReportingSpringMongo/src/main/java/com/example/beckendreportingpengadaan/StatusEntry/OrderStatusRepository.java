package com.example.beckendreportingpengadaan.StatusEntry;

import com.example.beckendreportingpengadaan.StatusEntry.OrderStatusModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderStatusRepository extends MongoRepository<OrderStatusModel, String> {
    OrderStatusModel findByOrderId(Long orderId);
}
