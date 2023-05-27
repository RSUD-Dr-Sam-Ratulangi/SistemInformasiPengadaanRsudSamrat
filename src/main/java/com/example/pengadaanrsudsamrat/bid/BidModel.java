package com.example.pengadaanrsudsamrat.bid;



import com.example.pengadaanrsudsamrat.ProductRequest.ProductRequestModel;
import com.example.pengadaanrsudsamrat.vendor.VendorModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * The type Bid model.
 */
@Entity
@Table(name = "bids")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private VendorModel vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_request_id", nullable = false)
    private ProductRequestModel productRequest;

    private double price;

    @Column(columnDefinition = "boolean default false")
    private boolean selected;
    // getters and setters
}

