package com.example.pengadaanrsudsamrat.order;

import com.example.pengadaanrsudsamrat.orderitem.OrderItemModel;

import java.math.BigDecimal;
import java.util.List;

public final class Util {
    private Util() {
        // Private constructor to prevent instantiation
    }

    //hitung total amount per ordedritem
    public static BigDecimal calculateTotalAmount(List<OrderItemModel> orderItems) {
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

