package com.example.pengadaanrsudsamrat.order;

import com.example.pengadaanrsudsamrat.order.OrderModel;
import com.example.pengadaanrsudsamrat.orderitem.OrderItemModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

/**
 * The interface Order repository.
 */
@Repository
public interface OrderRepository extends JpaRepository<OrderModel,Long> {

    /**
     * Find by order items in list.
     *
     * @param orderItems the order items
     * @return the list
     */
    List<OrderModel> findByOrderItemsIn(List<OrderItemModel> orderItems);
    List<OrderModel> findByOrderItemsProductVendorNameContainingIgnoreCaseOrOrderItemsProductNameContainingIgnoreCase(String vendorName, String productName);

    List<OrderModel> findByOrderItemsProductNameContainingIgnoreCase(String productName);

    List<OrderModel> findByOrderItemsProductVendorNameContainingIgnoreCase(String vendorName);
}
