package com.example.pengadaanrsudsamrat.Category;

import com.example.pengadaanrsudsamrat.Category.DTO.CategoryRequestDTO;
import com.example.pengadaanrsudsamrat.Category.DTO.CategoryResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pengadaan/dev/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@RequestBody CategoryRequestDTO categoryRequestDTO) {
        CategoryResponseDTO createdCategory = categoryService.createCategory(categoryRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        List<CategoryResponseDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}
