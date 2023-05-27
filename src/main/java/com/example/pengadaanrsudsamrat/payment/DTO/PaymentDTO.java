package com.example.pengadaanrsudsamrat.payment.DTO;


import com.example.pengadaanrsudsamrat.order.OrderModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * The type Payment dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

    private Long id = 0L;
    private BigDecimal amount;
    private Long orderid;

    // constructors, getters, and setters

}