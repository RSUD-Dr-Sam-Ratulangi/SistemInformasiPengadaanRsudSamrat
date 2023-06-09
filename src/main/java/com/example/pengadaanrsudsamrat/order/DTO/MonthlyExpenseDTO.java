package com.example.pengadaanrsudsamrat.order.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyExpenseDTO {
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal totalExpense;

    // Constructor, getters, and setters
}
