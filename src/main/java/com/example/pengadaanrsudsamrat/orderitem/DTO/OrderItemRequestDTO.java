package com.example.pengadaanrsudsamrat.orderitem.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Order item request dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemRequestDTO {

    private long orderItemId;
    private int quantity;
    private Double bidPrice;
    private Long productId;
    private String status;

    // Add the totalAmount field
    private Double totalAmount;

    // constructors, getters, and setters

    // Calculate the totalAmount by multiplying bidPrice and quantity
    public Double getTotalAmount() {
        if (bidPrice != null && quantity > 0) {
            return bidPrice * quantity;
        } else {
            return 0.0;
        }
    }
}
