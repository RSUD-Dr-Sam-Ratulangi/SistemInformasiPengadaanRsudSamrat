package com.example.pengadaanrsudsamrat.orderitem.DTO;

import com.example.pengadaanrsudsamrat.products.DTO.ProductResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Order item response dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponseDTO {

    private Long id;
    private int quantity;
    private Double bidPrice;
    private ProductResponseDTO product;
    private String status;
    private double totalAmount;

    // constructors, getters, and setters

}
