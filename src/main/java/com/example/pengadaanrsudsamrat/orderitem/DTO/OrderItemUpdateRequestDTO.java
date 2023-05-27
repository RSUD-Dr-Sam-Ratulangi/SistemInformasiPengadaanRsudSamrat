package com.example.pengadaanrsudsamrat.orderitem.DTO;

import com.example.pengadaanrsudsamrat.orderitem.OrderItemModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemUpdateRequestDTO {
    private Long orderItemId;
    private BigDecimal bidPrice;
    private OrderItemModel.OrderItemStatus status;
}

