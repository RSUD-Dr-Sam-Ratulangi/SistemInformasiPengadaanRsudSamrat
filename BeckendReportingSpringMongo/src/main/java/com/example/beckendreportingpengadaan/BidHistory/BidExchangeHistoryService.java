package com.example.beckendreportingpengadaan.BidHistory;

import com.example.beckendreportingpengadaan.BidHistory.DTO.BidExchangeHistoryRequestDTO;
import com.example.beckendreportingpengadaan.BidHistory.DTO.BidExchangeHistoryResponseDTO;
import com.example.beckendreportingpengadaan.BidItems.BidItemDTO;

import java.util.List;

public interface BidExchangeHistoryService {

    BidExchangeHistoryResponseDTO createBidExchangeHistory(BidExchangeHistoryRequestDTO requestDTO);

    List<BidItemDTO> getBidItemsByOrderIdAndBidItemId(Long orderId, Long bidItemId);

    List<BidExchangeHistoryResponseDTO> getAllByOrderId(Long orderId);
}
