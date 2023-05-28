package com.example.beckendreportingpengadaan.BidHistory;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bid-items")
public class BidItemController {

    private final BidItemService bidItemService;
    private final ModelMapper modelMapper;

    public BidItemController(BidItemService bidItemService, ModelMapper modelMapper) {
        this.bidItemService = bidItemService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<BidItemDTO>> getBidItemsById(@PathVariable("id") Long id) {
        List<BidItemModel> bidItems = bidItemService.findBidItemsById(id);

        if (bidItems.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<BidItemDTO> bidItemDTOs = bidItems.stream()
                .map(bidItem -> modelMapper.map(bidItem, BidItemDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(bidItemDTOs);
    }
}

