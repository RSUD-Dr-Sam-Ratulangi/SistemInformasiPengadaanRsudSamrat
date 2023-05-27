package com.example.pengadaanrsudsamrat.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The interface Payment repository.
 */
@Repository
public interface PaymentRepository extends JpaRepository<PaymentModel,Long> {
}
