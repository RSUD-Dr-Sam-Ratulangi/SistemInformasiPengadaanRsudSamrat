package com.example.pengadaanrsudsamrat.vendor;

import com.example.pengadaanrsudsamrat.products.ProductModel;
import com.example.pengadaanrsudsamrat.users.OwnerModel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * The type Vendor model.
 */
@Entity
@Table(name = "vendor")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class VendorModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uuid", nullable = false)
    private String vendoruuid;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private OwnerModel owner;

    @JsonBackReference // marks the owning side of the relationship
    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductModel> products;

    /**
     * Sets products.
     *
     * @param products the products
     */
    public void setProducts(List<ProductModel> products) {
        if (this.products == null) {
            this.products = new ArrayList<>();
        } else {
            for (ProductModel product : new ArrayList<>(this.products)) {
                product.setVendor(null);
                this.products.remove(product);
            }
        }
        if (products != null) {
            for (ProductModel product : products) {
                product.setVendor(this);
                this.products.add(product);
            }
        }
    }

    @PrePersist
    private void generateCustomId() {
        UUID uuid = UUID.randomUUID();
        String uniqueId = "VEN" + Instant.now().toEpochMilli() + uuid.toString().substring(0, 4).toUpperCase();
        setVendoruuid(uniqueId);
    }
}
