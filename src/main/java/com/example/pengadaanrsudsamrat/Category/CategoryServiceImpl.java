package com.example.pengadaanrsudsamrat.Category;

import com.example.pengadaanrsudsamrat.Category.DTO.CategoryRequestDTO;
import com.example.pengadaanrsudsamrat.Category.DTO.CategoryResponseDTO;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        String categoryName = categoryRequestDTO.getName();

        // Check if category with the same or similar name already exists
        Optional<CategoryModel> existingCategory = categoryRepository.findByNameIgnoreCase(categoryName);
        if (existingCategory.isPresent()) {
            throw new IllegalArgumentException("Category with the same or similar name already exists");
        }

        // Create and save the new category
        CategoryModel categoryModel = modelMapper.map(categoryRequestDTO, CategoryModel.class);
        CategoryModel savedCategory = categoryRepository.save(categoryModel);
        CategoryResponseDTO categoryResponseDTO = modelMapper.map(savedCategory, CategoryResponseDTO.class);
        return categoryResponseDTO;
    }

    @Override
    public List<CategoryResponseDTO> getAllCategories() {
        List<CategoryModel> categoryModels = categoryRepository.findAll();
        return categoryModels.stream()
                .map(categoryModel -> modelMapper.map(categoryModel, CategoryResponseDTO.class))
                .collect(Collectors.toList());
    }

}
