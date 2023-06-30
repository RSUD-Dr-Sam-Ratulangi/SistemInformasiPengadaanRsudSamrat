package com.example.pengadaanrsudsamrat.order;

import com.example.pengadaanrsudsamrat.order.DTO.*;
import com.example.pengadaanrsudsamrat.orderitem.DTO.OrderItemRequestDTO;
import com.example.pengadaanrsudsamrat.orderitem.DTO.OrderItemUpdateRequestDTO;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.stream.Collectors;

/**
 * The type Order controller.
 */
@RestController
@RequestMapping("/pengadaan/dev/v1/orders")
public class OrderController {

    private final OrderService orderService;
    private final ModelMapper modelMapper;


    /**
     * Instantiates a new Order controller.
     *
     * @param orderService the order service
     * @param modelMapper  the model mapper
     */
    public OrderController(OrderService orderService, ModelMapper modelMapper) {
        this.orderService = orderService;
        this.modelMapper = modelMapper;
    }


    @PostMapping
    public OrderResponseDTO createOrder(@Valid @RequestBody OrderRequestDTO orderRequestDTO) {
        OrderResponseDTO orderResponseDTO = orderService.createOrder(orderRequestDTO);
        return orderResponseDTO;
    }

    /**
     * Update order response entity.
     *
     * @param orderId                 the order id
     * @param orderItemRequestDTOList the order item request dto list
     * @return the response entity
     */
    @PutMapping("/{orderId}")
    public ResponseEntity<OrderResponseDTO> updateOrder(@PathVariable Long orderId,
                                                        @RequestBody List<OrderItemRequestDTO> orderItemRequestDTOList) {
        OrderResponseDTO updatedOrder = orderService.updateOrderItemList(orderId, orderItemRequestDTOList);
        return ResponseEntity.ok(updatedOrder);
    }

    /**
     * Add order item to order response entity.
     *
     * @param orderId    the order id
     * @param orderItems the order items
     * @return the response entity
     */
    @PostMapping("/{orderId}/items")
    public ResponseEntity<OrderResponseDTO> addOrderItemToOrder(@PathVariable Long orderId, @RequestBody List<OrderItemRequestDTO> orderItems) {
        OrderResponseDTO orderResponseDTO = orderService.addOrderItemsToOrder(orderId, orderItems);
        return ResponseEntity.ok(orderResponseDTO);
    }


    /**
     * Gets order by id.
     *
     * @param orderId the order id
     * @return the order by id
     */
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long orderId) {
        OrderResponseDTO orderResponseDTO = orderService.getOrderById(orderId);
        return ResponseEntity.ok(orderResponseDTO);
    }

    /**
     * Gets all orders.
     *
     * @return the all orders
     */
    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        List<OrderResponseDTO> orderResponseDTOs = orderService.getAllOrders();
        return ResponseEntity.ok(orderResponseDTOs);
    }

    /**
     * Gets orders by vendor.
     *
     * @param vendorId the vendor id
     * @return the orders by vendor
     */
    @GetMapping("/{vendorId}/vendor")
    public List<OrderResponseDTO> getOrdersByVendor(@PathVariable Long vendorId) {
        return orderService.getOrdersByVendorId(vendorId);
    }

    /**
     * Gets orders by vendor id with pagination.
     *
     * @param vendorId the vendor id
     * @param page     the page
     * @param size     the size
     * @return the orders by vendor id with pagination
     */
    @GetMapping("/{vendorId}/{page}/{size}")
    public ResponseEntity<Page<OrderGroupByVendorResponseDTO>> getOrdersByVendorIdWithPagination(
            @PathVariable Long vendorId,
            @PathVariable(value = "page") int page,
            @PathVariable(value = "size") int size) {
        Page<OrderGroupByVendorResponseDTO> orders = orderService.getOrdersByVendorIdWithPagination(vendorId, page, size);
        return ResponseEntity.ok(orders);
    }

//need to fix this
    @GetMapping("/orders/items")
    public ResponseEntity<Page<OrderItemInOrderResponseDTO>> getAllOrderItemsInOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "orderDate") String sortBy) {

        Page<OrderItemInOrderResponseDTO> orderItems = orderService.getAllOrderItemsInOrders(page, size, sortBy);
        return ResponseEntity.ok(orderItems);
    }

//need to fix this
    @GetMapping("/orders/items/details")
    public ResponseEntity<Page<OrderItemInOrderDetailResponseDTO>> getAllOrderItemDetails(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "orderDate") String sortBy) {

        Page<OrderItemInOrderDetailResponseDTO> orderItems = orderService.getAllOrderItemsInOrderDetails(page, size, sortBy);
        return ResponseEntity.ok().body(orderItems);
    }

    @GetMapping("/orders/items/product-stock")
    public ResponseEntity<List<OrderItemQuantityExchangeResponseDTO>> getAllOrderItemsWithProductStock(
            @RequestParam(required = false) String sortBy) {

        List<OrderItemQuantityExchangeResponseDTO> orderItemDTOList = orderService.getAllOrderItemsWithProductStock(sortBy);

        return ResponseEntity.ok().body(orderItemDTOList);
    }



    @GetMapping("/revenue-and-stock")
    public ResponseEntity<List<OrderItemProductInOrderRavanueAndStockResponseDTO>> getOrderItemProductInOrderRevenueAndStock(
            @RequestParam(required = false) Long productId) {
        List<OrderItemProductInOrderRavanueAndStockResponseDTO> responseDTOs = orderService.getOrderItemProductInOrderRevenueAndStock(productId);
        if (responseDTOs == null || responseDTOs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/{vendorUUID}/revenue")
    public List<OrderItemProductInOrderRavanueAndStockResponseDTO> getVendorProductRevenue(@PathVariable String vendorUUID) {
        return orderService.getVendorProductRevenue(vendorUUID);
    }

    @GetMapping("/orders/search")
    public List<OrderResponseDTO> searchOrdersByKeyword(@RequestParam(required = false) String keyword) {
        List<OrderModel> orderModels = orderService.searchOrderItems(keyword);
        return orderModels.stream()
                .map(order -> modelMapper.map(order, OrderResponseDTO.class))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderById(@PathVariable Long id) {
        orderService.deleteOrderById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{orderId}/items/{orderItemId}")
    public ResponseEntity<OrderResponseDTO> updateOrderItemsInOrder(
            @PathVariable Long orderId,
            @PathVariable Long orderItemId,
            @RequestBody OrderItemUpdateRequestDTO updateRequestDTO
    ) {
        // Call the service method to update the order items
        OrderResponseDTO updatedOrder = orderService.updateOrderItemsInOrder(orderId, orderItemId, updateRequestDTO);

        return ResponseEntity.ok(updatedOrder);
    }



    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponseDTO> updateOrderStatus(@PathVariable Long orderId, @RequestBody UpdateOrderStatusRequestDTO updateOrderStatusRequestDTO) {
        OrderResponseDTO orderResponseDTO = orderService.updateOrderStatus(orderId, updateOrderStatusRequestDTO.getStatus());
        return ResponseEntity.ok(orderResponseDTO);
    }

    @PutMapping("/{orderId}/{orderItemId}/payment")
    public ResponseEntity<OrderResponseDTO> updatePaymentForOrder(@PathVariable Long orderId, @PathVariable Long orderItemId ) {
        OrderResponseDTO updatedOrder = orderService.updatePaymentForOrder(orderId,orderItemId);
        return ResponseEntity.ok(updatedOrder);
    }

    @GetMapping("/top-vendor")
    public ResponseEntity<List<TopVendorResponseDTO>> getTopVendorsByOrdersAndPurchase(@RequestParam("limit") int limit) {
        List<TopVendorResponseDTO> topVendors = orderService.getTopVendorsByOrdersAndPurchase(limit);
        return ResponseEntity.ok(topVendors);
    }

    @GetMapping("/top-product")
    public ResponseEntity<List<TopProductResponseDTO>> getTopProductsByPurchase(@RequestParam("limit") int limit) {
        List<TopProductResponseDTO> topProducts = orderService.getTopProductsByPurchase(limit);
        return ResponseEntity.ok(topProducts);
    }

    @GetMapping("/monthly")
    public ResponseEntity<MonthlyExpenseDTO> getMonthlyExpense(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM") YearMonth yearMonth) {
        LocalDate date = yearMonth.atDay(1);
        MonthlyExpenseDTO monthlyExpense = orderService.getMonthlyExpense(date);
        return new ResponseEntity<>(monthlyExpense, HttpStatus.OK);
    }


    @GetMapping("/weekly")
    public ResponseEntity<WeeklyExpenseDTO> getWeeklyExpense() {
        WeeklyExpenseDTO weeklyExpenseDTO = orderService.getWeeklyExpense();
        return new ResponseEntity<>(weeklyExpenseDTO, HttpStatus.OK);
    }

    @GetMapping("/daily")
    public ResponseEntity<DailyExpenseDTO> getDailyExpense() {
        DailyExpenseDTO dailyExpense = orderService.getDailyExpense();
        return new ResponseEntity<>(dailyExpense, HttpStatus.OK);
    }


}
