package com.example.pengadaanrsudsamrat.order;

import com.example.pengadaanrsudsamrat.order.OrderModel;
import com.example.pengadaanrsudsamrat.orderitem.OrderItemModel;
import com.example.pengadaanrsudsamrat.vendor.VendorModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.math.BigDecimal;
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


    @Query("SELECT v, SUM(oi.quantity * p.price) AS totalPurchase, COUNT(o.id) AS totalOrders " +
            "FROM OrderModel o " +
            "JOIN o.orderItems oi " +
            "JOIN oi.product p " +
            "JOIN p.vendor v " +
            "GROUP BY v " +
            "ORDER BY totalOrders DESC, totalPurchase DESC " +
            "LIMIT :limit")
    List<Object[]> findTopVendorsByPurchaseAndTotalOrder(@Param("limit") int limit);



}
