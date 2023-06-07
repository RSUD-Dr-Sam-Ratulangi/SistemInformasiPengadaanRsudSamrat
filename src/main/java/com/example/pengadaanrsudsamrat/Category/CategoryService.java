package com.example.pengadaanrsudsamrat.Category;

import com.example.pengadaanrsudsamrat.Category.DTO.CategoryRequestDTO;
import com.example.pengadaanrsudsamrat.Category.DTO.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {
    CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequestDTO);
    List<CategoryResponseDTO> getAllCategories();
}
