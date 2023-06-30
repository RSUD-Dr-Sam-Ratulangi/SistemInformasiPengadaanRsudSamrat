package com.example.beckendreportingpengadaan.StatusEntry;

import com.example.beckendreportingpengadaan.StatusEntry.DTO.OrderStatusRequestDTO;
import com.example.beckendreportingpengadaan.StatusEntry.DTO.OrderStatusResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order-status")
public class OrderStatusController {
    private final OrderStatusService statusService;

    @Autowired
    public OrderStatusController(OrderStatusService statusService) {
        this.statusService = statusService;
    }

    @PostMapping
    public ResponseEntity<OrderStatusResponseDTO> createOrderStatus(@RequestBody OrderStatusRequestDTO requestDTO) {
        OrderStatusResponseDTO responseDTO = statusService.createOrderStatus(requestDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/{orderId}/status")
    public ResponseEntity<OrderStatusResponseDTO> addStatusToOrder(
            @PathVariable Long orderId,
            @RequestParam OrderStatusModel.OrderStatus status) {

        OrderStatusResponseDTO responseDTO = statusService.addStatusToOrder(orderId, status);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/status-entry/{orderId}")
    public ResponseEntity<OrderStatusResponseDTO> getOrderStatusByOrderId(@PathVariable Long orderId) {
        OrderStatusResponseDTO responseDTO = statusService.getOrderStatusByOrderId(orderId);
        if (responseDTO != null) {
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
