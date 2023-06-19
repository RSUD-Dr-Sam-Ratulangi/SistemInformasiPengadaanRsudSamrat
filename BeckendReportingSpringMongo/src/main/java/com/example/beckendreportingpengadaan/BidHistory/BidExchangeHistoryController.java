package com.example.beckendreportingpengadaan.BidHistory;

import com.example.beckendreportingpengadaan.BidHistory.DTO.BidExchangeHistoryRequestDTO;
import com.example.beckendreportingpengadaan.BidHistory.DTO.BidExchangeHistoryResponseDTO;
import com.example.beckendreportingpengadaan.BidItems.BidItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bid-exchange")
public class BidExchangeHistoryController {

    private final BidExchangeHistoryService bidExchangeHistoryService;

    @Autowired
    public BidExchangeHistoryController(BidExchangeHistoryService bidExchangeHistoryService) {
        this.bidExchangeHistoryService = bidExchangeHistoryService;
    }

    @PostMapping("/history")
    public ResponseEntity<BidExchangeHistoryResponseDTO> createBidExchangeHistory(@RequestBody BidExchangeHistoryRequestDTO requestDTO) {
        BidExchangeHistoryResponseDTO responseDTO = bidExchangeHistoryService.createBidExchangeHistory(requestDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/bid-items/{orderId}/{bidItemId}")
    public ResponseEntity<List<BidItemDTO>> getBidItemsByOrderIdAndBidItemId(@PathVariable("orderId") Long orderId, @PathVariable("bidItemId") Long bidItemId) {
        List<BidItemDTO> bidItems = bidExchangeHistoryService.getBidItemsByOrderIdAndBidItemId(orderId, bidItemId);
        if (bidItems.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(bidItems);
        }
    }


}

