package com.example.beckendreportingpengadaan.BidItems;

import java.util.List;

public interface BidItemService {

    List<BidItemModel> findBidItemsById(Long id);
}
