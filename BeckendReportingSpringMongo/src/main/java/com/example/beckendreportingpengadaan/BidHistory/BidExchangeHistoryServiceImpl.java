package com.example.beckendreportingpengadaan.BidHistory;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BidExchangeHistoryServiceImpl implements BidExchangeHistoryService {

    private final BidExchangeHistoryRepository bidExchangeHistoryRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public BidExchangeHistoryServiceImpl(BidExchangeHistoryRepository bidExchangeHistoryRepository, ModelMapper modelMapper) {
        this.bidExchangeHistoryRepository = bidExchangeHistoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public BidExchangeHistoryResponseDTO createBidExchangeHistory(BidExchangeHistoryRequestDTO requestDTO) {
        // Map the request DTO to the bid exchange history model
        BidExchangeHistoryModel bidExchangeHistoryModel = modelMapper.map(requestDTO, BidExchangeHistoryModel.class);

        // Retrieve the existing bidItems from the database
        BidExchangeHistoryModel existingBidExchangeHistory = bidExchangeHistoryRepository.findById(bidExchangeHistoryModel.getId())
                .orElse(null);
        List<BidItemModel> existingBidItems = (existingBidExchangeHistory != null) ? existingBidExchangeHistory.getBidItems() : new ArrayList<>();

        // Add all the bidItems from the request to the existingBidItems list
        List<BidItemDTO> bidItemsDTO = requestDTO.getBidItems();
        List<BidItemModel> newBidItems = bidItemsDTO.stream()
                .map(bidItemDTO -> modelMapper.map(bidItemDTO, BidItemModel.class))
                .collect(Collectors.toList());
        existingBidItems.addAll(newBidItems);

        // Update the bidItems in the bidExchangeHistoryModel
        bidExchangeHistoryModel.setBidItems(existingBidItems);

        // Save the bid exchange history model in the database
        bidExchangeHistoryModel = bidExchangeHistoryRepository.save(bidExchangeHistoryModel);

        // Map the saved bid exchange history model back to the response DTO
        BidExchangeHistoryResponseDTO responseDTO = modelMapper.map(bidExchangeHistoryModel, BidExchangeHistoryResponseDTO.class);

        return responseDTO;
    }

    @Override
    public List<BidItemDTO> getBidItemsByOrderIdAndBidItemId(Long orderId, Long bidItemId) {
        List<BidExchangeHistoryModel> bidExchangeHistories = bidExchangeHistoryRepository.findByOrderIdAndBidItemsId(orderId, bidItemId);
        List<BidItemDTO> bidItems = new ArrayList<>();

        for (BidExchangeHistoryModel bidExchangeHistory : bidExchangeHistories) {
            List<BidItemModel> bidItemModels = bidExchangeHistory.getBidItems();
            for (BidItemModel bidItemModel : bidItemModels) {
                if (bidItemModel.getId().equals(bidItemId)) {
                    BidItemDTO bidItemDTO = modelMapper.map(bidItemModel, BidItemDTO.class);
                    bidItems.add(bidItemDTO);
                }
            }
        }

        return bidItems;
    }






}

