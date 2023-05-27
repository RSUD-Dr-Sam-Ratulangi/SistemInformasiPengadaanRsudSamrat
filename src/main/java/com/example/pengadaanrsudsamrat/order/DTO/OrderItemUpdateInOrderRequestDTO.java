package com.example.pengadaanrsudsamrat.order.DTO;

import com.example.pengadaanrsudsamrat.orderitem.DTO.OrderItemUpdateRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemUpdateInOrderRequestDTO {

    private Long orderId;
    private List<OrderItemUpdateRequestDTO> orderItems;
}
