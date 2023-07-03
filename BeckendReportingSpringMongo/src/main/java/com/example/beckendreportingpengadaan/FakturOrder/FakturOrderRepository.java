package com.example.beckendreportingpengadaan.FakturOrder;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FakturOrderRepository extends MongoRepository<FakturOrder, String> {
    // Add any custom query methods if needed
}
