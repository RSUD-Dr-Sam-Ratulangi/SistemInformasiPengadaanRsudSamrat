package com.example.pengadaanrsudsamrat.bid;

import com.example.pengadaanrsudsamrat.bid.DTO.BidDTO;
import com.example.pengadaanrsudsamrat.bid.DTO.CreateBidResponseDTO;

import java.util.List;

/**
 * The interface Bid service.
 */
public interface BidService {

    /**
     * Gets all bids by product request id.
     *
     * @param productRequestId the product request id
     * @return the all bids by product request id
     */
    List<BidDTO> getAllBidsByProductRequestId(Long productRequestId);

    /**
     * Gets bid by id.
     *
     * @param id the id
     * @return the bid by id
     */
    BidDTO getBidById(Long id);

    /**
     * Create bid create bid response dto.
     *
     * @param bidDTO the bid dto
     * @return the create bid response dto
     */
    CreateBidResponseDTO createBid(BidDTO bidDTO);

    /**
     * Update bid bid dto.
     *
     * @param id     the id
     * @param bidDTO the bid dto
     * @return the bid dto
     */
    BidDTO updateBid(Long id, BidDTO bidDTO);

    /**
     * Delete bid.
     *
     * @param id the id
     */
    void deleteBid(Long id);

    /**
     * Select winning bid bid dto.
     *
     * @param bidId the bid id
     * @return the bid dto
     */
    BidDTO selectWinningBid(Long bidId);

}