package com.example.pengadaanrsudsamrat.Category;

import com.example.pengadaanrsudsamrat.Category.DTO.CategoryRequestDTO;
import com.example.pengadaanrsudsamrat.Category.DTO.CategoryResponseDTO;

public interface CategoryService {
    CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequestDTO);
}
