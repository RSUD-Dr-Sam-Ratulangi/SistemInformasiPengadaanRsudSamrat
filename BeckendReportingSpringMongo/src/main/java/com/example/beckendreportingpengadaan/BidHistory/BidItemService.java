package com.example.beckendreportingpengadaan.BidHistory;

import java.util.List;

public interface BidItemService {

    List<BidItemModel> findBidItemsById(Long id);
}
