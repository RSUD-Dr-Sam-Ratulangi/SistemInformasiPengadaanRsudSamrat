package com.example.pengadaanrsudsamrat.orderitem;

import com.example.pengadaanrsudsamrat.orderitem.DTO.OrderItemRequestDTO;
import com.example.pengadaanrsudsamrat.orderitem.DTO.OrderItemResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The type Order item controller.
 */
@RestController
@RequestMapping("/pengadaan/dev/v1/orderitems")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Create order item response entity.
     *
     * @param orderItemRequestDTO the order item request dto
     * @return the response entity
     */
    @PostMapping
    public ResponseEntity<OrderItemResponseDTO> createOrderItem(@RequestBody OrderItemRequestDTO orderItemRequestDTO) {
        OrderItemResponseDTO createdOrderItem = orderItemService.createOrderItem(orderItemRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrderItem);
    }

    /**
     * Gets order item by id.
     *
     * @param id the id
     * @return the order item by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderItemResponseDTO> getOrderItemById(@PathVariable Long id) {
        OrderItemResponseDTO orderItem = orderItemService.getOrderItemById(id);
        return ResponseEntity.ok(orderItem);
    }

    /**
     * Delete order item by id response entity.
     *
     * @param id the id
     * @return the response entity
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderItemById(@PathVariable Long id) {
        orderItemService.deleteOrderItemById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Gets all order items.
     *
     * @return the all order items
     */
    @GetMapping
    public ResponseEntity<List<OrderItemResponseDTO>> getAllOrderItems() {
        List<OrderItemResponseDTO> orderItems = orderItemService.getAllOrderItems();
        return ResponseEntity.ok(orderItems);
    }





}
