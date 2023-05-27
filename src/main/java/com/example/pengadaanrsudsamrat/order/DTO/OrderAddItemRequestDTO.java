package com.example.pengadaanrsudsamrat.order.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Order add item request dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderAddItemRequestDTO {
    private Long productId;
    private int quantity;
    private double bidPrice;

}

