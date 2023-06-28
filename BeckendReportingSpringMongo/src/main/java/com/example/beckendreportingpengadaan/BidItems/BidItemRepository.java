package com.example.beckendreportingpengadaan.BidItems;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BidItemRepository extends MongoRepository<BidItemModel, String> {
    List<BidItemModel> findById(Long id);
}
