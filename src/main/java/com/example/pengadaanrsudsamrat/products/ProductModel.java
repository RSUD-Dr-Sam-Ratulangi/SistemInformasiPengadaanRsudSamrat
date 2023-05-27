package com.example.pengadaanrsudsamrat.products;

import com.example.pengadaanrsudsamrat.Category.CategoryModel;
import com.example.pengadaanrsudsamrat.vendor.VendorModel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

/**
 * The type Product model.
 */
@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uuid", nullable = false)
    private String productuuid;


    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id")
    private VendorModel vendor;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "product_category",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<CategoryModel> categories;

    @Column(name = "image_url")
    private String imageUrl;


    @PrePersist
    private void generateCustomId() {
        UUID uuid = UUID.randomUUID();
        String uniqueId = "PRD" + Instant.now().toEpochMilli() + uuid.toString().substring(0, 4).toUpperCase();
        setProductuuid(uniqueId);
    }
}
