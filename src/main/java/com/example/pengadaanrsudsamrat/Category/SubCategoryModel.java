package com.example.pengadaanrsudsamrat.Category;

import com.example.pengadaanrsudsamrat.Category.CategoryModel;
import com.example.pengadaanrsudsamrat.products.ProductModel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "subcategory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;



    // Add any other necessary fields and mappings
}
