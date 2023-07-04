package com.example.beckendreportingpengadaan.Nota;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotaRepository extends MongoRepository<NotaModel, String> {
    NotaModel findByOrderId(String orderId);
    // Add any custom query methods if needed
}