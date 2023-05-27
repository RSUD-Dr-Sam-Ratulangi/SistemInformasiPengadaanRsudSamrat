package com.example.pengadaanrsudsamrat.bid;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * The interface Bid repository.
 */
public interface BidRepository extends JpaRepository<BidModel,Long> {

    /**
     * Find all by product request id list.
     *
     * @param productRequestId the product request id
     * @return the list
     */
    List<BidModel> findAllByProductRequestId(Long productRequestId);
}
