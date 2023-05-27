package com.example.pengadaanrsudsamrat.Category;

import com.example.pengadaanrsudsamrat.Category.DTO.CategoryRequestDTO;
import com.example.pengadaanrsudsamrat.Category.DTO.CategoryResponseDTO;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequestDTO) {
        CategoryModel categoryModel = modelMapper.map(categoryRequestDTO, CategoryModel.class);
        CategoryModel savedCategory = categoryRepository.save(categoryModel);
        CategoryResponseDTO categoryResponseDTO = modelMapper.map(savedCategory, CategoryResponseDTO.class);
        return categoryResponseDTO;
    }
}
