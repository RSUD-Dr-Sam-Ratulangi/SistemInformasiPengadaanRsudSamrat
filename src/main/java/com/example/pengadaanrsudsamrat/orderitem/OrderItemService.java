package com.example.pengadaanrsudsamrat.orderitem;

import com.example.pengadaanrsudsamrat.orderitem.DTO.OrderItemRequestDTO;
import com.example.pengadaanrsudsamrat.orderitem.DTO.OrderItemResponseDTO;

import java.util.List;

/**
 * The interface Order item service.
 */
public interface OrderItemService {
    /**
     * Create order item order item response dto.
     *
     * @param orderItemRequestDTO the order item request dto
     * @return the order item response dto
     */
    OrderItemResponseDTO createOrderItem(OrderItemRequestDTO orderItemRequestDTO);

    /**
     * Gets order item by id.
     *
     * @param id the id
     * @return the order item by id
     */
    OrderItemResponseDTO getOrderItemById(Long id);

    /**
     * Delete order item by id.
     *
     * @param id the id
     */
    void deleteOrderItemById(Long id);

    /**
     * Gets all order items.
     *
     * @return the all order items
     */
    List<OrderItemResponseDTO> getAllOrderItems();
}
