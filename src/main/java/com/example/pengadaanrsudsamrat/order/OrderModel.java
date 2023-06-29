package com.example.pengadaanrsudsamrat.order;

import com.example.pengadaanrsudsamrat.orderitem.OrderItemModel;
import com.example.pengadaanrsudsamrat.payment.PaymentModel;
import com.example.pengadaanrsudsamrat.vendor.VendorModel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * The type Order model.
 */
@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderModel {

    public enum OrderStatus {
        ORDER,
        NEGOTIATION,
        VALIDATING,
        CHECKING,
        PAYMENT,
        CANCEL
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @Column(name = "status", nullable = true)
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id")
    private VendorModel vendor;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemModel> orderItems = new ArrayList<>();

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private PaymentModel payment;

    public void recalculateTotalAmount() {
        double totalAmount = orderItems.stream()
                .mapToDouble(OrderItemModel::getTotalAmount)
                .sum();

        if (payment != null) {
            payment.setAmount(BigDecimal.valueOf(totalAmount));
        }
    }
}
