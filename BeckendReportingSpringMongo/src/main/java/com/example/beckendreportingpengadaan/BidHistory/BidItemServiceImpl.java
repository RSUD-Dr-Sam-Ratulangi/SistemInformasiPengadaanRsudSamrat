package com.example.beckendreportingpengadaan.BidHistory;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidItemServiceImpl implements BidItemService {

    private final BidItemRepository bidItemRepository;

    public BidItemServiceImpl(BidItemRepository bidItemRepository) {
        this.bidItemRepository = bidItemRepository;
    }

    @Override
    public List<BidItemModel> findBidItemsById(Long id) {
        return bidItemRepository.findById(id);
    }
}

