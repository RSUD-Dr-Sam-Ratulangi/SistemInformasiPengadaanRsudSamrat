package com.example.pengadaanrsudsamrat;

import com.example.pengadaanrsudsamrat.order.*;
import com.example.pengadaanrsudsamrat.order.DTO.*;
import com.example.pengadaanrsudsamrat.orderitem.DTO.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import com.example.pengadaanrsudsamrat.order.*;
import com.example.pengadaanrsudsamrat.order.DTO.*;
import com.example.pengadaanrsudsamrat.orderitem.DTO.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OrderControllerTest {

    @Mock
    private OrderService orderService;
    @Mock
    private ModelMapper modelMapper;

    private OrderController orderController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        orderController = new OrderController(orderService, modelMapper);
    }

    @Test
    void createOrder() {
        // Mock data
        OrderRequestDTO orderRequestDTO = new OrderRequestDTO();
        OrderResponseDTO expectedResponseDTO = new OrderResponseDTO();

        // Mock service method
        when(orderService.createOrder(orderRequestDTO)).thenReturn(expectedResponseDTO);

        // Perform the test
        OrderResponseDTO actualResponseDTO = orderController.createOrder(orderRequestDTO);

        // Verify the service method was called
        verify(orderService).createOrder(orderRequestDTO);

        // Check the response
        assertNotNull(actualResponseDTO);

        // Modify the assertion to make it fail
        // Change the expected response to a different value
        OrderResponseDTO differentResponseDTO = new OrderResponseDTO();
        assertNotEquals(differentResponseDTO, actualResponseDTO);
    }


    @Test
    void updateOrder() {
        // Mock data
        Long orderId = 1L;
        List<OrderItemRequestDTO> orderItemRequestDTOList = Arrays.asList(new OrderItemRequestDTO());
        OrderResponseDTO expectedResponseDTO = new OrderResponseDTO();

        // Mock service method
        when(orderService.updateOrderItemList(orderId, orderItemRequestDTOList)).thenReturn(expectedResponseDTO);

        // Perform the test
        ResponseEntity<OrderResponseDTO> responseEntity = orderController.updateOrder(orderId, orderItemRequestDTOList);

        // Verify the service method was called
        verify(orderService).updateOrderItemList(orderId, orderItemRequestDTOList);

        // Check the response
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponseDTO, responseEntity.getBody());
    }

    @Test
    void addOrderItemToOrder() {
        // Mock data
        Long orderId = 1L;
        List<OrderItemRequestDTO> orderItems = Arrays.asList(new OrderItemRequestDTO());
        OrderResponseDTO expectedResponseDTO = new OrderResponseDTO();

        // Mock service method
        when(orderService.addOrderItemsToOrder(orderId, orderItems)).thenReturn(expectedResponseDTO);

        // Perform the test
        ResponseEntity<OrderResponseDTO> responseEntity = orderController.addOrderItemToOrder(orderId, orderItems);

        // Verify the service method was called
        verify(orderService).addOrderItemsToOrder(orderId, orderItems);

        // Check the response
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponseDTO, responseEntity.getBody());
    }

    @Test
    void getOrderById() {
        // Mock data
        Long orderId = 1L;
        OrderResponseDTO expectedResponseDTO = new OrderResponseDTO();

        // Mock service method
        when(orderService.getOrderById(orderId)).thenReturn(expectedResponseDTO);

        // Perform the test
        ResponseEntity<OrderResponseDTO> responseEntity = orderController.getOrderById(orderId);

        // Verify the service method was called
        verify(orderService).getOrderById(orderId);

        // Check the response
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponseDTO, responseEntity.getBody());
    }

    @Test
    void getAllOrders() {
        // Mock data
        List<OrderResponseDTO> expectedResponseDTOs = Arrays.asList(new OrderResponseDTO());

        // Mock service method
        when(orderService.getAllOrders()).thenReturn(expectedResponseDTOs);

        // Perform the test
        ResponseEntity<List<OrderResponseDTO>> responseEntity = orderController.getAllOrders();

        // Verify the service method was called
        verify(orderService).getAllOrders();

        // Check the response
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponseDTOs, responseEntity.getBody());
    }

    @Test
    void getOrdersByVendor() {
        // Mock data
        Long vendorId = 1L;
        List<OrderResponseDTO> expectedResponseDTOs = Arrays.asList(new OrderResponseDTO());

        // Mock service method
        when(orderService.getOrdersByVendorId(vendorId)).thenReturn(expectedResponseDTOs);

        // Perform the test
        List<OrderResponseDTO> actualResponseDTOs = orderController.getOrdersByVendor(vendorId);

        // Verify the service method was called
        verify(orderService).getOrdersByVendorId(vendorId);

        // Check the response
        assertNotNull(actualResponseDTOs);
        assertEquals(expectedResponseDTOs, actualResponseDTOs);
    }

    @Test
    void getOrdersByVendorIdWithPagination() {
        // Mock data
        Long vendorId = 1L;
        int page = 0;
        int size = 10;
        Page<OrderGroupByVendorResponseDTO> expectedResponsePage = mock(Page.class);

        // Mock service method
        when(orderService.getOrdersByVendorIdWithPagination(vendorId, page, size)).thenReturn(expectedResponsePage);

        // Perform the test
        ResponseEntity<Page<OrderGroupByVendorResponseDTO>> responseEntity =
                orderController.getOrdersByVendorIdWithPagination(vendorId, page, size);

        // Verify the service method was called
        verify(orderService).getOrdersByVendorIdWithPagination(vendorId, page, size);

        // Check the response
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponsePage, responseEntity.getBody());
    }

    @Test
    void getAllOrderItemsInOrders() {
        // Mock data
        int page = 0;
        int size = 10;
        String sortBy = "orderDate";
        Page<OrderItemInOrderResponseDTO> expectedResponsePage = mock(Page.class);

        // Mock service method
        when(orderService.getAllOrderItemsInOrders(page, size, sortBy)).thenReturn(expectedResponsePage);

        // Perform the test
        ResponseEntity<Page<OrderItemInOrderResponseDTO>> responseEntity =
                orderController.getAllOrderItemsInOrders(page, size, sortBy);

        // Verify the service method was called
        verify(orderService).getAllOrderItemsInOrders(page, size, sortBy);

        // Check the response
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponsePage, responseEntity.getBody());
    }

    @Test
    void getAllOrderItemDetails() {
        // Mock data
        int page = 0;
        int size = 10;
        String sortBy = "orderDate";
        Page<OrderItemInOrderDetailResponseDTO> expectedResponsePage = mock(Page.class);

        // Mock service method
        when(orderService.getAllOrderItemsInOrderDetails(page, size, sortBy)).thenReturn(expectedResponsePage);

        // Perform the test
        ResponseEntity<Page<OrderItemInOrderDetailResponseDTO>> responseEntity =
                orderController.getAllOrderItemDetails(page, size, sortBy);

        // Verify the service method was called
        verify(orderService).getAllOrderItemsInOrderDetails(page, size, sortBy);

        // Check the response
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponsePage, responseEntity.getBody());
    }

    @Test
    void getAllOrderItemsWithProductStock() {
        // Mock data
        int page = 0;
        int size = 10;
        String sortBy = "orderDate";
        Page<OrderItemQuantityExchangeResponseDTO> expectedResponsePage = mock(Page.class);

        // Mock service method
        when(orderService.getAllOrderItemsWithProductStock(page, size, sortBy)).thenReturn(expectedResponsePage);

        // Perform the test
        ResponseEntity<Page<OrderItemQuantityExchangeResponseDTO>> responseEntity =
                orderController.getAllOrderItemsWithProductStock(page, size, sortBy);

        // Verify the service method was called
        verify(orderService).getAllOrderItemsWithProductStock(page, size, sortBy);

        // Check the response
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponsePage, responseEntity.getBody());
    }

    @Test
    void getOrderItemProductInOrderRevenueAndStock() {
        // Mock data
        Long productId = 1L;
        List<OrderItemProductInOrderRavanueAndStockResponseDTO> expectedResponseDTOs = Arrays.asList(new OrderItemProductInOrderRavanueAndStockResponseDTO());

        // Mock service method
        when(orderService.getOrderItemProductInOrderRevenueAndStock(productId)).thenReturn(expectedResponseDTOs);

        // Perform the test
        ResponseEntity<List<OrderItemProductInOrderRavanueAndStockResponseDTO>> responseEntity =
                orderController.getOrderItemProductInOrderRevenueAndStock(productId);

        // Verify the service method was called
        verify(orderService).getOrderItemProductInOrderRevenueAndStock(productId);

        // Check the response
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponseDTOs, responseEntity.getBody());
    }

    @Test
    void getVendorProductRevenue() {
        // Mock data
        String vendorUUID = UUID.randomUUID().toString();
        List<OrderItemProductInOrderRavanueAndStockResponseDTO> expectedResponseDTOs = Arrays.asList(new OrderItemProductInOrderRavanueAndStockResponseDTO());

        // Mock service method
        when(orderService.getVendorProductRevenue(vendorUUID)).thenReturn(expectedResponseDTOs);

        // Perform the test
        List<OrderItemProductInOrderRavanueAndStockResponseDTO> actualResponseDTOs =
                orderController.getVendorProductRevenue(vendorUUID);

        // Verify the service method was called
        verify(orderService).getVendorProductRevenue(vendorUUID);

        // Check the response
        assertNotNull(actualResponseDTOs);
        assertEquals(expectedResponseDTOs, actualResponseDTOs);
    }

    @Test
    void searchOrdersByKeyword() {
        // Mock data
        String keyword = "example";
        List<OrderModel> orderModels = Arrays.asList(new OrderModel());
        List<OrderResponseDTO> expectedResponseDTOs = Arrays.asList(new OrderResponseDTO());

        // Mock service method
        when(orderService.searchOrderItems(keyword)).thenReturn(orderModels);
        when(modelMapper.map(any(OrderModel.class), eq(OrderResponseDTO.class))).thenReturn(new OrderResponseDTO());

        // Perform the test
        List<OrderResponseDTO> actualResponseDTOs = orderController.searchOrdersByKeyword(keyword);

        // Verify the service methods were called
        verify(orderService).searchOrderItems(keyword);
        verify(modelMapper, times(orderModels.size())).map(any(OrderModel.class), eq(OrderResponseDTO.class));

        // Check the response
        assertNotNull(actualResponseDTOs);
        assertEquals(expectedResponseDTOs, actualResponseDTOs);
    }
}

