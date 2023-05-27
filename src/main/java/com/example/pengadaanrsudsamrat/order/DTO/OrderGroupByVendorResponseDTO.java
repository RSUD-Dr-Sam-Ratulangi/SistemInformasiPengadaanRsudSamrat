package com.example.pengadaanrsudsamrat.order.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * The type Order group by vendor response dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderGroupByVendorResponseDTO {

    private Long orderId;
    private LocalDateTime orderDate;
    private int quantity;
    private String productName;
    private String productUuid;
    private double bidPrice;
    private String status;
    private double price;



    // constructors, getters, and setters

}
