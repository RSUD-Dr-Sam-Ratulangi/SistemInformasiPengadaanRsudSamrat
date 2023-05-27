package com.example.pengadaanrsudsamrat.order;

import com.example.pengadaanrsudsamrat.UTIL.LoggingRequestInterceptor;
import com.example.pengadaanrsudsamrat.UTIL.exception.NotEnoughStockException;
import com.example.pengadaanrsudsamrat.UTIL.exception.NotFoundException;
import com.example.pengadaanrsudsamrat.UTIL.exception.OrderNotFoundException;
import com.example.pengadaanrsudsamrat.order.DTO.*;
import com.example.pengadaanrsudsamrat.order.ReportServiceDTO.BidExchangeHistoryRequestDTO;
import com.example.pengadaanrsudsamrat.order.ReportServiceDTO.BidExchangeHistoryResponseDTO;
import com.example.pengadaanrsudsamrat.order.ReportServiceDTO.BidItemDTO;
import com.example.pengadaanrsudsamrat.orderitem.DTO.OrderItemRequestDTO;
import com.example.pengadaanrsudsamrat.orderitem.DTO.OrderItemUpdateRequestDTO;
import com.example.pengadaanrsudsamrat.orderitem.OrderItemModel;
import com.example.pengadaanrsudsamrat.orderitem.OrderItemRepository;
import com.example.pengadaanrsudsamrat.payment.DTO.PaymentDTO;
import com.example.pengadaanrsudsamrat.payment.PaymentModel;
import com.example.pengadaanrsudsamrat.payment.PaymentRepository;
import com.example.pengadaanrsudsamrat.products.DTO.ProductResponseDTO;
import com.example.pengadaanrsudsamrat.products.ProductModel;
import com.example.pengadaanrsudsamrat.products.ProductRepository;
import com.example.pengadaanrsudsamrat.vendor.DTO.VendorResponseDTO;
import com.example.pengadaanrsudsamrat.vendor.VendorModel;
import jakarta.annotation.Nullable;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.*;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * The type Order service.
 */
@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final OrderItemRepository orderItemRepository;
    private final PaymentRepository paymentRepository;
    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;

    /**
     * Instantiates a new Order service.
     *
     * @param orderRepository     the order repository
     * @param orderItemRepository the order item repository
     * @param paymentRepository   the payment repository
     * @param modelMapper         the model mapper
     * @param productRepository   the product repository
     */
    public OrderServiceImpl(OrderRepository orderRepository, OrderItemRepository orderItemRepository, PaymentRepository paymentRepository,
                            ModelMapper modelMapper, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;

        this.paymentRepository = paymentRepository;
        this.modelMapper = modelMapper;
        this.productRepository = productRepository;

    }

    @Override
    public OrderResponseDTO createOrder(@Valid OrderRequestDTO orderRequestDTO) {
        OrderModel orderModel = new OrderModel();
        orderModel.setOrderDate(LocalDateTime.now());
        orderModel.setStatus(OrderModel.OrderStatus.ORDER); // Set the initial status to "ORDER"

        OrderModel savedOrderModel = orderRepository.save(orderModel);

        PaymentModel paymentModel = new PaymentModel();
        paymentModel.setOrder(savedOrderModel);
        PaymentModel savedPaymentModel = paymentRepository.save(paymentModel);

        savedOrderModel.setPayment(savedPaymentModel);
        orderRepository.save(savedOrderModel);

        return modelMapper.map(savedOrderModel, OrderResponseDTO.class);
    }







    @Override
    public OrderResponseDTO updateOrderItemList(Long orderId, List<OrderItemRequestDTO> orderItemRequestDTOList) {
        // Find the order by ID
        OrderModel orderModel = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        // Get the existing order items
        List<OrderItemModel> existingOrderItems = orderModel.getOrderItems();

        // Create a new list to store the updated order items
        List<OrderItemModel> updatedOrderItems = new ArrayList<>(existingOrderItems);

        // Loop through each order item in the request
        for (OrderItemRequestDTO orderItemRequestDTO : orderItemRequestDTOList) {
            // Check if there is an existing order item with the same product ID
            boolean found = false;
            for (OrderItemModel existingOrderItem : existingOrderItems) {
                if (existingOrderItem.getProduct().getId().equals(orderItemRequestDTO.getProductId())) {
                    // Update the quantity of the existing order item
                    existingOrderItem.setQuantity(existingOrderItem.getQuantity() + orderItemRequestDTO.getQuantity());
                    found = true;
                    break;
                }
            }
            if (!found) {
                // Create a new order item and add it to the updated list
                OrderItemModel newOrderItem = new OrderItemModel();
                ProductModel product = productRepository.findById(orderItemRequestDTO.getProductId())
                        .orElseThrow(() -> new EntityNotFoundException("Product not found"));
                newOrderItem.setProduct(product);
                newOrderItem.setQuantity(orderItemRequestDTO.getQuantity());
                updatedOrderItems.add(newOrderItem);
            }
        }

        // Update the order with the updated order items
        orderModel.setOrderItems(updatedOrderItems);
        OrderModel savedOrderModel = orderRepository.save(orderModel);

        // Recalculate the total amount due for the order
        double totalAmount = 0.0;
        for (OrderItemModel orderItemModel : savedOrderModel.getOrderItems()) {
            totalAmount += orderItemModel.getProduct().getPrice() * orderItemModel.getQuantity();
        }

        // Update the payment amount and save it
        PaymentModel paymentModel = savedOrderModel.getPayment();
        paymentModel.setAmount(BigDecimal.valueOf(totalAmount));
        PaymentModel savedPaymentModel = paymentRepository.save(paymentModel);

        // Update the order with the payment and save it again
        savedOrderModel.setPayment(savedPaymentModel);
        OrderModel updatedOrderModel = orderRepository.save(savedOrderModel);

        return modelMapper.map(updatedOrderModel, OrderResponseDTO.class);
    }



    @Override
    public OrderResponseDTO addOrderItemsToOrder(Long orderId, List<OrderItemRequestDTO> orderItems) {
        OrderModel orderModel = orderRepository.findById(orderId)
                .orElseThrow(EntityNotFoundException::new);
        List<OrderItemModel> existingOrderItems = orderModel.getOrderItems();
        if (existingOrderItems == null) {
            existingOrderItems = new ArrayList<>();
        }
        for (OrderItemRequestDTO orderItemDTO : orderItems) {
            ProductModel productModel = productRepository.findById(orderItemDTO.getProductId())
                    .orElseThrow(EntityNotFoundException::new);
            int quantityToAdd = orderItemDTO.getQuantity();
            // Check if the product has enough stock
            if (productModel.getQuantity() < quantityToAdd) {
                throw new NotEnoughStockException(productModel.getName());
            }
            // Update the product quantity and save it
            productModel.setQuantity(productModel.getQuantity() - quantityToAdd);
            productRepository.save(productModel);
            // Check if the order already contains the product
            boolean orderContainsProduct = false;
            for (OrderItemModel existingOrderItem : existingOrderItems) {
                if (existingOrderItem.getProduct().equals(productModel)) {
                    existingOrderItem.setQuantity(existingOrderItem.getQuantity() + quantityToAdd);
                    orderContainsProduct = true;
                    break;
                }
            }
            // If the order doesn't contain the product, create a new OrderItem for it
            if (!orderContainsProduct) {
                OrderItemModel orderItemModel = new OrderItemModel();
                orderItemModel.setProduct(productModel);
                orderItemModel.setQuantity(quantityToAdd);
                orderItemModel.setStatus(OrderItemModel.OrderItemStatus.PENDING); // Set status to PENDING
                // Set bid price as product price if not provided
                orderItemModel.setBidPrice(orderItemDTO.getBidPrice() != null ? orderItemDTO.getBidPrice() : productModel.getPrice());
                orderItemModel.setOrder(orderModel);
                existingOrderItems.add(orderItemModel);
            }
        }
        orderModel.setOrderItems(existingOrderItems);
        OrderModel savedOrderModel = orderRepository.save(orderModel);

        double totalAmount = 0.0;
        for (OrderItemModel orderItemModel : existingOrderItems) {
            totalAmount += orderItemModel.getBidPrice() * orderItemModel.getQuantity();
        }

        PaymentModel paymentModel = savedOrderModel.getPayment();
        if (paymentModel == null) {
            paymentModel = new PaymentModel();
            paymentModel.setOrder(savedOrderModel); // set the payment's order to the saved order
        }
        paymentModel.setAmount(BigDecimal.valueOf(totalAmount));
        PaymentModel savedPaymentModel = paymentRepository.save(paymentModel);
        savedOrderModel.setPayment(savedPaymentModel);
        orderRepository.save(savedOrderModel);
        return modelMapper.map(savedOrderModel, OrderResponseDTO.class);
    }


    @Override
    public OrderResponseDTO updateOrderItemsInOrder(Long orderId, Long orderItemId, OrderItemUpdateRequestDTO updateRequestDTO) {
        OrderModel orderModel = orderRepository.findById(orderId)
                .orElseThrow(EntityNotFoundException::new);

        List<OrderItemModel> existingOrderItems = orderModel.getOrderItems();
        if (existingOrderItems == null) {
            existingOrderItems = new ArrayList<>();
        }

        boolean hasOffer = false; // Flag to track if any order item has an "OFFER" status

        Optional<OrderItemModel> optionalOrderItem = existingOrderItems.stream()
                .filter(item -> item.getId().equals(orderItemId))
                .findFirst();

        if (optionalOrderItem.isPresent()) {
            OrderItemModel orderItemModel = optionalOrderItem.get();

            // Get the bidPrice from the updateRequestDTO
            BigDecimal bidPrice = updateRequestDTO.getBidPrice();

            // Calculate totalAmount if bidPrice is available
            if (bidPrice != null) {
                BigDecimal totalAmount = bidPrice.multiply(BigDecimal.valueOf(orderItemModel.getQuantity()));
                orderItemModel.setTotalAmount(totalAmount.doubleValue());
                orderModel.getPayment().setAmount(Util.calculateTotalAmount(existingOrderItems));
            }

            // Update the bid price if provided
            if (bidPrice != null) {
                orderItemModel.setBidPrice(bidPrice.doubleValue());
            }

            // Update the status if provided
            OrderItemModel.OrderItemStatus updatedStatus = updateRequestDTO.getStatus();
            if (updatedStatus != null) {
                // Automatically update status to "ACCEPTED," "REJECTED," or "OFFER"
                if (updatedStatus == OrderItemModel.OrderItemStatus.ACCEPTED ||
                        updatedStatus == OrderItemModel.OrderItemStatus.REJECTED ||
                        updatedStatus == OrderItemModel.OrderItemStatus.OFFER) {
                    orderItemModel.setStatus(updatedStatus);
                    if (updatedStatus == OrderItemModel.OrderItemStatus.OFFER) {
                        hasOffer = true; // Set the flag to true if the status is "OFFER"
                    }
                }

                // Update payment amount if status changes or bidPrice changes
                if (!Objects.equals(orderItemModel.getStatus(), updatedStatus) ||
                        bidPrice != null) {
                    orderModel.getPayment().setAmount(Util.calculateTotalAmount(existingOrderItems));
                }
            }
        }

        // Update the order status to "NEGOTIATION" if any order item has an "OFFER" status
        if (hasOffer) {
            orderModel.setStatus(OrderModel.OrderStatus.NEGOTIATION);
        }

        orderModel.setOrderItems(existingOrderItems);

        OrderModel savedOrderModel = orderRepository.save(orderModel);

        RestTemplate restTemplate = new RestTemplate();

        // Map the updated response to the request DTO for the subsequent POST request
        BidExchangeHistoryRequestDTO requestDTO = new BidExchangeHistoryRequestDTO();
        requestDTO.setOrderId(savedOrderModel.getId());
        requestDTO.setOrderDate(savedOrderModel.getOrderDate().toString());

        List<BidItemDTO> bidItems = savedOrderModel.getOrderItems().stream()
                .map(orderItem -> {
                    BidItemDTO bidItemDTO = new BidItemDTO();
                    bidItemDTO.setId(orderItem.getId());
                    bidItemDTO.setProductName(orderItem.getProduct().getName());
                    bidItemDTO.setOriginalPrice(orderItem.getProduct().getPrice());
                    bidItemDTO.setBidPrice(orderItem.getBidPrice());
                    bidItemDTO.setBidPriceChange(orderItem.getBidPrice() - orderItem.getProduct().getPrice());
                    bidItemDTO.setStatus(orderItem.getStatus().toString());
                    return bidItemDTO;
                })
                .collect(Collectors.toList());

        requestDTO.setBidItems(bidItems);
        requestDTO.setStatus(savedOrderModel.getStatus().toString());

        // Save the updated order to the other Spring Boot backend endpoint
        String otherEndpointUrl = "http://localhost:8090/api/bid-exchange/history"; // Replace with the actual URL of the other endpoint
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        // Create a request entity with the data from the response
        HttpEntity<BidExchangeHistoryRequestDTO> requestEntity = new HttpEntity<>(requestDTO, headers);

        // Make the HTTP POST request to the other endpoint
        ResponseEntity<BidExchangeHistoryResponseDTO> responseEntity = restTemplate.exchange(
                otherEndpointUrl,
                HttpMethod.POST,
                requestEntity,
                BidExchangeHistoryResponseDTO.class
        );

        // Get the response body from the response entity
        BidExchangeHistoryResponseDTO responseDTO = responseEntity.getBody();

        // Map the response DTO back to the appropriate model or DTO if needed
        // ...

        // Return the updated order response
        return modelMapper.map(savedOrderModel, OrderResponseDTO.class);
    }



    @Override
    public OrderResponseDTO getOrderById(Long orderId) {
        OrderModel orderModel = orderRepository.findById(orderId)
                .orElseThrow(EntityNotFoundException::new);

        BigDecimal totalAmount = BigDecimal.ZERO;
        for (OrderItemModel orderItemModel : orderModel.getOrderItems()) {
            BigDecimal bidPrice = BigDecimal.valueOf(orderItemModel.getBidPrice());
            BigDecimal quantity = BigDecimal.valueOf(orderItemModel.getQuantity());
            BigDecimal itemTotalAmount = bidPrice.multiply(quantity);
            totalAmount = totalAmount.add(itemTotalAmount);
        }

        PaymentModel paymentModel = orderModel.getPayment();
        if (paymentModel == null) {
            throw new EntityNotFoundException("Payment not found for this order.");
        }

        PaymentDTO paymentDTO = modelMapper.map(paymentModel, PaymentDTO.class);
        paymentDTO.setAmount(totalAmount);

        OrderResponseDTO orderResponseDTO = modelMapper.map(orderModel, OrderResponseDTO.class);
        orderResponseDTO.setPayment(paymentDTO);

        return orderResponseDTO;
    }



    @Override
    @Nullable
    public List<OrderResponseDTO> getAllOrders() {
        List<OrderModel> orderModels = orderRepository.findAll();
        if (orderModels.isEmpty()) {
            return null;
        }
        List<OrderResponseDTO> orderResponseDTOs = new ArrayList<>();

        for (OrderModel orderModel : orderModels) {
            double totalAmount = 0.0;
            for (OrderItemModel orderItemModel : orderModel.getOrderItems()) {
                totalAmount += orderItemModel.getProduct().getPrice() * orderItemModel.getQuantity();
            }

            PaymentModel paymentModel = orderModel.getPayment();
            if (paymentModel == null) {
                throw new EntityNotFoundException("Payment not found for this order.");
            }

            PaymentDTO paymentDTO = modelMapper.map(paymentModel, PaymentDTO.class);
            paymentDTO.setAmount(BigDecimal.valueOf(totalAmount));

            OrderResponseDTO orderResponseDTO = modelMapper.map(orderModel, OrderResponseDTO.class);
            orderResponseDTO.setPayment(paymentDTO);
            orderResponseDTOs.add(orderResponseDTO);
        }

        return orderResponseDTOs;
    }


    @Override
    public List<OrderResponseDTO> getOrdersByVendorId(Long vendorId) {
        List<OrderItemModel> orderItems = orderItemRepository.findByProduct_Vendor_Id(vendorId);
        List<OrderModel> orders = orderRepository.findByOrderItemsIn(orderItems);

        return orders.stream()
                .map(order -> modelMapper.map(order, OrderResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Page<OrderGroupByVendorResponseDTO> getOrdersByVendorIdWithPagination(Long vendorId, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "orderDate");
        Pageable pageable = PageRequest.of(page, size, sort);

        List<OrderItemModel> orderItems = orderItemRepository.findByProduct_Vendor_Id(vendorId);
        List<OrderModel> orders = orderRepository.findByOrderItemsIn(orderItems);

        List<OrderGroupByVendorResponseDTO> responseList = new ArrayList<>();

        for (OrderModel order : orders) {
            for (OrderItemModel item : order.getOrderItems()) {
                OrderGroupByVendorResponseDTO response = new OrderGroupByVendorResponseDTO();
                response.setOrderId(order.getId());
                response.setOrderDate(order.getOrderDate());
                response.setQuantity(item.getQuantity());
                response.setProductName(item.getProduct().getName());
                response.setProductUuid(item.getProduct().getProductuuid());
                response.setPrice(item.getProduct().getPrice());
                response.setBidPrice(item.getBidPrice());
                if (item.getStatus() != null) {
                    response.setStatus(item.getStatus().toString());
                } else {
                    response.setStatus(null); // or set it to an appropriate default value
                }
                responseList.add(response);
            }
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), responseList.size());
        Page<OrderGroupByVendorResponseDTO> pageResponse = new PageImpl<>(responseList.subList(start, end), pageable, responseList.size());

        return pageResponse;
    }




    //Filter all Order Item in Order
    @Override
    public Page<OrderItemInOrderResponseDTO> getAllOrderItemsInOrders(int page, int size, String sortBy) {
        if (sortBy == null) {
            sortBy = "orderDate"; // Set default sort order to orderDate
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<OrderModel> orders = orderRepository.findAll(pageable);

        List<OrderItemInOrderResponseDTO> orderItemDTOList = new ArrayList<>();
        for (OrderModel orderModel : orders) {
            List<OrderItemModel> orderItems = orderModel.getOrderItems();
            for (OrderItemModel orderItem : orderItems) {
                OrderItemInOrderResponseDTO orderItemDTO = new OrderItemInOrderResponseDTO();
                orderItemDTO.setOrderId(orderModel.getId());
                orderItemDTO.setOrderItemId(orderItem.getId());

                if (orderItem.getProduct() != null) {
                    if (orderItem.getProduct().getVendor() != null) {
                        orderItemDTO.setVendorId(orderItem.getProduct().getVendor().getId());
                    }
                    orderItemDTO.setProductId(orderItem.getProduct().getId());
                    orderItemDTO.setProductQuantity(orderItem.getProduct().getQuantity());
                    BigDecimal amountPerItem = BigDecimal.valueOf(orderItem.getProduct().getPrice());
                    orderItemDTO.setAmountPerItem(amountPerItem);
                } else {
                    orderItemDTO.setVendorId(null);
                    orderItemDTO.setProductId(null);
                    orderItemDTO.setProductQuantity(0);
                    orderItemDTO.setAmountPerItem(null);
                }

                orderItemDTO.setOrderItemQuantity(orderItem.getQuantity());
                orderItemDTO.setOrderDate(orderModel.getOrderDate());
                orderItemDTOList.add(orderItemDTO);
            }
        }

        return new PageImpl<>(orderItemDTOList, pageable, orderItemDTOList.size());
    }


    //Filter all Order Item in Order
    @Override
    public Page<OrderItemInOrderDetailResponseDTO> getAllOrderItemsInOrderDetails(int page, int size, String sortBy) {
        if (sortBy == null) {
            sortBy = "orderDate"; // Set default sort order to orderDate
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<OrderModel> orders = orderRepository.findAll(pageable);

        List<OrderItemInOrderDetailResponseDTO> orderItemDTOList = new ArrayList<>();
        for (OrderModel orderModel : orders) {
            List<OrderItemModel> orderItems = orderModel.getOrderItems();
            for (OrderItemModel orderItem : orderItems) {
                OrderItemInOrderDetailResponseDTO orderItemDTO = new OrderItemInOrderDetailResponseDTO();
                orderItemDTO.setOrderId(orderModel.getId());
                orderItemDTO.setOrderItemId(orderItem.getId());
                orderItemDTO.setOrderItemQuantity(orderItem.getQuantity());
                orderItemDTO.setAmountPerItem(BigDecimal.valueOf(orderItem.getProduct().getPrice()));
                orderItemDTO.setOrderDate(orderModel.getOrderDate());

                ProductModel product = orderItem.getProduct();
                if (product != null) {
                    ProductResponseDTO productDTO = new ProductResponseDTO();
                    productDTO.setId(product.getId());
                    productDTO.setName(product.getName());
                    productDTO.setDescription(product.getDescription());
                    productDTO.setPrice(product.getPrice());
                    productDTO.setQuantity(product.getQuantity());
                    VendorModel vendor = product.getVendor();
                    if (vendor != null) {
                        VendorResponseDTO vendorDTO = new VendorResponseDTO();
                        vendorDTO.setId(vendor.getId());
                        vendorDTO.setName(vendor.getName());
                        vendorDTO.setAddress(vendor.getAddress());
                        vendorDTO.setPhoneNumber(vendor.getPhone());
                        productDTO.setVendor(vendorDTO);
                    }
                    orderItemDTO.setProduct(productDTO);
                }

                OrderModel.OrderStatus status = orderModel.getStatus();
                if (status != null) {
                    orderItemDTO.setStatus(status);
                } else {
                    orderItemDTO.setStatus(null); // Set status to null if it's null in the database
                }

                orderItemDTOList.add(orderItemDTO);
            }
        }

        return new PageImpl<>(orderItemDTOList, pageable, orderItemDTOList.size());
    }




//pertukaran stock dan pembelian
    @Override
    public Page<OrderItemQuantityExchangeResponseDTO> getAllOrderItemsWithProductStock(int page, int size, String sortBy) {
        if (sortBy == null) {
            sortBy = "orderDate"; // Set default sort order to orderDate
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<OrderModel> orders = orderRepository.findAll(pageable);

        List<OrderItemQuantityExchangeResponseDTO> orderItemDTOList = new ArrayList<>();
        for (OrderModel orderModel : orders) {
            List<OrderItemModel> orderItems = orderModel.getOrderItems();
            for (OrderItemModel orderItem : orderItems) {
                OrderItemQuantityExchangeResponseDTO orderItemDTO = new OrderItemQuantityExchangeResponseDTO();
                orderItemDTO.setOrderId(orderModel.getId());
                orderItemDTO.setOrderItemId(orderItem.getId());
                if (orderItem.getProduct() != null) {
                    if (orderItem.getProduct().getVendor() != null) {
                        orderItemDTO.setVendor(modelMapper.map(orderItem.getProduct().getVendor(), VendorResponseDTO.class));
                    }
                    orderItemDTO.setProduct(modelMapper.map(orderItem.getProduct(), ProductResponseDTO.class));
                    orderItemDTO.setProductQuantity(orderItem.getProduct().getQuantity());
                    orderItemDTO.setProductTotalStock(orderItem.getProduct().getQuantity() - orderItem.getQuantity());
                }
                orderItemDTO.setOrderItemQuantity(orderItem.getQuantity());
                orderItemDTO.setOrderDate(orderModel.getOrderDate());
                orderItemDTO.setStatus(orderModel.getStatus());
                orderItemDTOList.add(orderItemDTO);
            }
        }

        return new PageImpl<>(orderItemDTOList, pageable, orderItemDTOList.size());
    }




    @Override
    public List<OrderItemProductInOrderRavanueAndStockResponseDTO> getOrderItemProductInOrderRevenueAndStock(Long productId) {
        List<OrderItemProductInOrderRavanueAndStockResponseDTO> result = new ArrayList<>();
        List<OrderItemModel> orderItems;
        if (productId == null) {
            orderItems = orderItemRepository.findAll();
        } else {
            orderItems = orderItemRepository.findByProductId(productId);
        }

        Map<String, OrderItemProductInOrderRavanueAndStockResponseDTO> productMap = new HashMap<>();

        for (OrderItemModel orderItem : orderItems) {
            String productKey = orderItem.getProduct().getId().toString();
            if (productMap.containsKey(productKey)) {
                OrderItemProductInOrderRavanueAndStockResponseDTO itemDTO = productMap.get(productKey);
                itemDTO.setOrderItemQuantity(itemDTO.getOrderItemQuantity() + orderItem.getQuantity());
                itemDTO.setProductTotalStock(itemDTO.getProductTotalStock() + orderItem.getQuantity());
                Double orderItemRevenue = orderItem.getQuantity() * orderItem.getProduct().getPrice();
                itemDTO.setTotalRevenue(itemDTO.getTotalRevenue() + orderItemRevenue);
            } else {
                OrderItemProductInOrderRavanueAndStockResponseDTO itemDTO = new OrderItemProductInOrderRavanueAndStockResponseDTO();
                itemDTO.setProductId(orderItem.getProduct().getId());
                itemDTO.setProductName(orderItem.getProduct().getName());
                itemDTO.setVendorName(orderItem.getProduct().getVendor() != null ? orderItem.getProduct().getVendor().getName() : null);
                itemDTO.setProductQuantity(Objects.requireNonNullElse(orderItem.getProduct().getQuantity(), 0));
                itemDTO.setProductTotalStock(Objects.requireNonNullElse(orderItem.getQuantity(), 0));
                itemDTO.setProductPrice(Objects.requireNonNullElse(orderItem.getProduct().getPrice(), 0.0));
                Double orderItemRevenue = Objects.requireNonNullElse(orderItem.getQuantity(), 0) * Objects.requireNonNullElse(orderItem.getProduct().getPrice(), 0.0);
                itemDTO.setTotalRevenue(orderItemRevenue);
                itemDTO.setOrderItemQuantity(Objects.requireNonNullElse(orderItem.getQuantity(), 0));
                productMap.put(productKey, itemDTO);
            }
        }

        result.addAll(productMap.values());
        return result;
    }

    @Override
    public List<OrderItemProductInOrderRavanueAndStockResponseDTO> getVendorProductRevenue(String vendorUUID) {
        List<OrderItemModel> orderItems = orderItemRepository.findByProduct_Vendor_Vendoruuid(vendorUUID);
        Map<Long, OrderItemProductInOrderRavanueAndStockResponseDTO> productMap = new HashMap<>();
        for (OrderItemModel orderItem : orderItems) {
            Long productKey = orderItem.getProduct().getId();
            if (productMap.containsKey(productKey)) {
                OrderItemProductInOrderRavanueAndStockResponseDTO itemDTO = productMap.get(productKey);
                itemDTO.setTotalOrderRevenue(itemDTO.getTotalOrderRevenue() + (orderItem.getQuantity() * orderItem.getProduct().getPrice()));
                itemDTO.setOrderItemQuantity(itemDTO.getOrderItemQuantity() + orderItem.getQuantity());
                itemDTO.setTotalStockExchange(itemDTO.getTotalStockExchange() + (orderItem.getQuantity() * orderItem.getProduct().getQuantity()));
            } else {
                OrderItemProductInOrderRavanueAndStockResponseDTO itemDTO = new OrderItemProductInOrderRavanueAndStockResponseDTO();
                itemDTO.setProductId(orderItem.getProduct().getId());
                itemDTO.setProductName(orderItem.getProduct().getName());
                itemDTO.setVendorName(orderItem.getProduct().getVendor() != null ? orderItem.getProduct().getVendor().getName() : null);
                itemDTO.setProductQuantity(orderItem.getProduct().getQuantity());
                itemDTO.setProductTotalStock(orderItem.getQuantity());
                itemDTO.setProductPrice(orderItem.getProduct().getPrice());
                Double orderItemRevenue = orderItem.getQuantity() * orderItem.getProduct().getPrice();
                itemDTO.setTotalRevenue(orderItemRevenue);
                itemDTO.setTotalOrderRevenue(orderItemRevenue);
                itemDTO.setOrderItemQuantity(orderItem.getQuantity());
                itemDTO.setTotalStockExchange(orderItem.getQuantity() * orderItem.getProduct().getQuantity());
                productMap.put(productKey, itemDTO);
            }
        }
        return new ArrayList<>(productMap.values());
    }




    @Override
    public List<OrderModel> searchOrderItems(String keyword) {
        if (StringUtils.hasText(keyword)) {
            return orderRepository.findByOrderItemsProductVendorNameContainingIgnoreCaseOrOrderItemsProductNameContainingIgnoreCase(keyword, keyword);
        } else {
            return orderRepository.findAll();
        }
    }

    @Override
    public void deleteOrderById(Long id) {
        Optional<OrderModel> optionalOrderModel = orderRepository.findById(id);
        if (optionalOrderModel.isPresent()) {
            orderRepository.deleteById(id);
        } else {
            throw new OrderNotFoundException("Order not found with ID: " + id);
        }
    }


    @Override
    public OrderResponseDTO updateOrderStatus(Long orderId, OrderModel.OrderStatus status) {
        Optional<OrderModel> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            OrderModel orderModel = optionalOrder.get();
            orderModel.setStatus(status);
            OrderModel updatedOrder = orderRepository.save(orderModel);
            return modelMapper.map(updatedOrder, OrderResponseDTO.class);
        } else {
            throw new NotFoundException("Order not found with ID: " + orderId);
        }
    }


    @Override
    public OrderResponseDTO updatePaymentForOrder(Long orderId, Long orderItemId) {
        OrderModel orderModel = orderRepository.findById(orderId)
                .orElseThrow(EntityNotFoundException::new);

        OrderItemModel orderItem = orderModel.getOrderItems().stream()
                .filter(item -> item.getId().equals(orderItemId))
                .findFirst()
                .orElseThrow(EntityNotFoundException::new);

        // Check if the order item status is ACCEPTED
        if (orderItem.getStatus() != OrderItemModel.OrderItemStatus.ACCEPTED) {
            throw new IllegalArgumentException("Payment cannot be updated. The order item status is not ACCEPTED.");
        }

        // Calculate the total amount based on the quantity of the order item
        double totalAmount = orderItem.getTotalAmount();

        PaymentModel paymentModel = orderModel.getPayment();
        if (paymentModel == null) {
            paymentModel = new PaymentModel();
            paymentModel.setOrder(orderModel);
        }

        paymentModel.setAmount(BigDecimal.valueOf(totalAmount));

        PaymentModel savedPaymentModel = paymentRepository.save(paymentModel);
        orderModel.setPayment(savedPaymentModel);
        orderRepository.save(orderModel);

        OrderResponseDTO orderResponseDTO = modelMapper.map(orderModel, OrderResponseDTO.class);
        orderResponseDTO.getPayment().setAmount(paymentModel.getAmount());

        return orderResponseDTO;
    }


    private BigDecimal calculateTotalAmount(List<OrderItemModel> orderItems) {
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (OrderItemModel orderItem : orderItems) {
            BigDecimal bidPrice = BigDecimal.valueOf(orderItem.getBidPrice());
            BigDecimal quantity = BigDecimal.valueOf(orderItem.getQuantity());
            BigDecimal itemTotalAmount = bidPrice.multiply(quantity);
            totalAmount = totalAmount.add(itemTotalAmount);
        }
        return totalAmount;
    }




}





