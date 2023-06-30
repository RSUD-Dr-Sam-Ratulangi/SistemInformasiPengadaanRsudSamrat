package com.example.beckendreportingpengadaan.StatusEntry;

import com.example.beckendreportingpengadaan.StatusEntry.DTO.OrderStatusRequestDTO;
import com.example.beckendreportingpengadaan.StatusEntry.DTO.OrderStatusResponseDTO;
import com.example.beckendreportingpengadaan.StatusEntry.DTO.StatusEntryDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderStatusServiceImpl implements OrderStatusService {
    private final OrderStatusRepository statusRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public OrderStatusServiceImpl(OrderStatusRepository statusRepository, ModelMapper modelMapper) {
        this.statusRepository = statusRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public OrderStatusResponseDTO createOrderStatus(OrderStatusRequestDTO requestDTO) {
        Long orderId = requestDTO.getOrderId();


        OrderStatusModel existingStatus = statusRepository.findByOrderId(orderId);
        if (existingStatus != null) {
               existingStatus.getStatusList().add(new StatusEntry(requestDTO.getStatus(), LocalDateTime.now()));
            existingStatus = statusRepository.save(existingStatus);
            return modelMapper.map(existingStatus, OrderStatusResponseDTO.class);
        } else {

            OrderStatusModel statusModel = modelMapper.map(requestDTO, OrderStatusModel.class);
            statusModel.getStatusList().add(new StatusEntry(requestDTO.getStatus(), LocalDateTime.now()));
            statusModel = statusRepository.save(statusModel);
            return modelMapper.map(statusModel, OrderStatusResponseDTO.class);
        }
    }

    @Override
    public OrderStatusResponseDTO addStatusToOrder(Long orderId, OrderStatusModel.OrderStatus status) {

        OrderStatusModel existingStatus = statusRepository.findByOrderId(orderId);
        if (existingStatus == null) {

            throw new IllegalArgumentException("Order status not found for orderId: " + orderId);
        }

        existingStatus.getStatusList().add(new StatusEntry(status, LocalDateTime.now()));
        existingStatus = statusRepository.save(existingStatus);

        return modelMapper.map(existingStatus, OrderStatusResponseDTO.class);
    }

    @Override
    public OrderStatusResponseDTO getOrderStatusByOrderId(Long orderId) {
        OrderStatusModel statusModel = statusRepository.findByOrderId(orderId);
        if (statusModel != null) {
            List<StatusEntryDTO> statusEntries = mapStatusEntries(statusModel.getStatusList());
            OrderStatusResponseDTO responseDTO = new OrderStatusResponseDTO();
            responseDTO.setOrderId(statusModel.getOrderId());
            responseDTO.setStatusList(statusEntries);
            return responseDTO;
        }
        return null; // or throw an exception indicating that the order status was not found
    }

    private List<StatusEntryDTO> mapStatusEntries(List<StatusEntry> statusList) {
        return statusList.stream()
                .map(this::mapStatusEntry)
                .collect(Collectors.toList());
    }

    private StatusEntryDTO mapStatusEntry(StatusEntry statusEntry) {
        StatusEntryDTO entryDTO = new StatusEntryDTO();
        entryDTO.setStatus(statusEntry.getStatus());
        entryDTO.setTimestamp(statusEntry.getTimestamp());
        return entryDTO;
    }










}
