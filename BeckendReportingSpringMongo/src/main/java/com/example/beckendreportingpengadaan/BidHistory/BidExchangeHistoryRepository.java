package com.example.beckendreportingpengadaan.BidHistory;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BidExchangeHistoryRepository extends MongoRepository<BidExchangeHistoryModel, String> {

    List<BidExchangeHistoryModel> findByOrderIdAndBidItemsId(Long orderId, Long bidItemId);
}
