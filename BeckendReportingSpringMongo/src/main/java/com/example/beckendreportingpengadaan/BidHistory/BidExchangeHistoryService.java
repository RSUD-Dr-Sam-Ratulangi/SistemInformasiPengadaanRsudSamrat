package com.example.beckendreportingpengadaan.BidHistory;

import java.util.List;

public interface BidExchangeHistoryService {

    BidExchangeHistoryResponseDTO createBidExchangeHistory(BidExchangeHistoryRequestDTO requestDTO);


    List<BidItemDTO> getBidItemsByOrderIdAndBidItemId(Long orderId, Long bidItemId);
}
