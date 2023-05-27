package com.example.pengadaanrsudsamrat.order.DTO;


import com.example.pengadaanrsudsamrat.order.OrderModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateOrderStatusRequestDTO {

    private OrderModel.OrderStatus status;

    // constructors, getters, and setters

}

