package com.example.pengadaanrsudsamrat.orderitem;

import com.example.pengadaanrsudsamrat.orderitem.DTO.OrderItemRequestDTO;
import com.example.pengadaanrsudsamrat.orderitem.DTO.OrderItemResponseDTO;
import com.example.pengadaanrsudsamrat.products.ProductModel;
import com.example.pengadaanrsudsamrat.products.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

/**
 * The type Order item service.
 */
@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public OrderItemResponseDTO createOrderItem(OrderItemRequestDTO orderItemRequestDTO) {
        // Check if product exists
        ProductModel productModel = productRepository.findById(orderItemRequestDTO.getProductId())
                .orElseThrow(EntityNotFoundException::new);

        // Check if there is enough quantity
        if (productModel.getQuantity() < orderItemRequestDTO.getQuantity()) {
            throw new IllegalArgumentException("Not enough quantity available");
        }

        // Create order item and set product and quantity
        OrderItemModel orderItemModel = new OrderItemModel();
        orderItemModel.setProduct(productModel);
        orderItemModel.setQuantity(orderItemRequestDTO.getQuantity());

        // Decrease product quantity
        productModel.setQuantity(productModel.getQuantity() - orderItemRequestDTO.getQuantity());
        productRepository.save(productModel);

        // Save order item and return response
        OrderItemModel savedOrderItemModel = orderItemRepository.save(orderItemModel);
        return modelMapper.map(savedOrderItemModel, OrderItemResponseDTO.class);
    }


    @Override
    public OrderItemResponseDTO getOrderItemById(Long id) {
        OrderItemModel orderItemModel = orderItemRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        return modelMapper.map(orderItemModel, OrderItemResponseDTO.class);
    }

    @Override
    public void deleteOrderItemById(Long id) {
        orderItemRepository.deleteById(id);
    }

    @Override
    public List<OrderItemResponseDTO> getAllOrderItems() {
        List<OrderItemModel> orderItemModels = orderItemRepository.findAll();
        Type listType = new TypeToken<List<OrderItemResponseDTO>>(){}.getType();
        return modelMapper.map(orderItemModels, listType);
    }
}
