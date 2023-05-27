package com.example.pengadaanrsudsamrat.products;

import com.example.pengadaanrsudsamrat.Category.CategoryModel;
import com.example.pengadaanrsudsamrat.Category.CategoryRepository;
import com.example.pengadaanrsudsamrat.products.DTO.ProductRequestDTO;
import com.example.pengadaanrsudsamrat.products.DTO.ProductResponseDTO;
import com.example.pengadaanrsudsamrat.vendor.VendorModel;
import com.example.pengadaanrsudsamrat.vendor.VendorRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * The type Product service.
 */
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final VendorRepository vendorRepository;
    private final ModelMapper modelMapper;
    private final CategoryRepository categoryRepository;

    /**
     * Instantiates a new Product service.
     *
     * @param productRepository  the product repository
     * @param vendorRepository   the vendor repository
     * @param modelMapper        the model mapper
     * @param categoryRepository
     */
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, VendorRepository vendorRepository, ModelMapper modelMapper, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.vendorRepository = vendorRepository;
        this.modelMapper = modelMapper;
        this.categoryRepository = categoryRepository;
    }



    @Override
    public Page<ProductResponseDTO> findAllProducts(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductModel> products = productRepository.findAll(pageable);
        List<ProductResponseDTO> productResponseDTOS = products.getContent().stream()
                .map(product -> modelMapper.map(product, ProductResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(productResponseDTOS, pageable, products.getTotalElements());
    }

    @Override
    public Optional<ProductResponseDTO> findProductByUuid(String uuid) {
        Optional<ProductModel> product = productRepository.findByProductuuid(uuid);
        return Optional.ofNullable(product.map(p -> modelMapper.map(p, ProductResponseDTO.class))
                .orElseThrow(() -> new RuntimeException("Product not found")));
    }

    @Override
    public ProductResponseDTO addProductToVendor(String vendorUuid, ProductRequestDTO productRequestDTO) {
        VendorModel vendor = vendorRepository.findByVendoruuid(vendorUuid)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        ProductModel product = modelMapper.map(productRequestDTO, ProductModel.class);

        // Map the category IDs from the request DTO to CategoryModel instances
        Set<CategoryModel> categories = productRequestDTO.getCategoryIds().stream()
                .map(categoryId -> categoryRepository.findById(categoryId)
                        .orElseThrow(() -> new RuntimeException("Category not found: " + categoryId)))
                .collect(Collectors.toSet());
        product.setCategories(categories);

        product.setVendor(vendor);

        ProductModel savedProduct = productRepository.save(product);
        return modelMapper.map(savedProduct, ProductResponseDTO.class);
    }


    @Override
    public List<ProductResponseDTO> findAllProductsByVendorUuid(String vendorUuid) {
        List<ProductModel> products = productRepository.findByVendorVendoruuid(vendorUuid);
        return products.stream()
                .map(product -> modelMapper.map(product, ProductResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDTO updateProductByProductUUid(String uuid, ProductRequestDTO productRequestDTO) {
        Optional<ProductModel> productOptional = productRepository.findByProductuuid(uuid);

        if (productOptional.isPresent()) {
            ProductModel product = productOptional.get();

            if (productRequestDTO.getName() != null) {
                product.setName(productRequestDTO.getName());
            }

            if (productRequestDTO.getDescription() != null) {
                product.setDescription(productRequestDTO.getDescription());
            }

            if (productRequestDTO.getPrice() != 0) {
                product.setPrice(productRequestDTO.getPrice());
            }

            if (productRequestDTO.getQuantity() != 0) {
                product.setQuantity(productRequestDTO.getQuantity());
            }

            if (productRequestDTO.getImageUrl() != null) {
                product.setImageUrl(productRequestDTO.getImageUrl());
            }

            return modelMapper.map(productRepository.save(product), ProductResponseDTO.class);
        } else {
            throw new RuntimeException("Product not found");
        }
    }
    @Override
    public void deleteProductByUuid(String uuid) {
        ProductModel product = productRepository.findByProductuuid(uuid)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        productRepository.delete(product);
    }


    @Override
    public Page<ProductResponseDTO> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductModel> products = productRepository.search(keyword, pageable);
        return products.map(product -> modelMapper.map(product, ProductResponseDTO.class));
    }

    @Override
    public Page<ProductResponseDTO> filterProductsByCategoryName(String categoryName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductModel> productPage = productRepository.findByCategoriesName(categoryName, pageable);
        List<ProductResponseDTO> products = productPage.getContent().stream()
                .map(product -> modelMapper.map(product, ProductResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(products, pageable, productPage.getTotalElements());
    }





}
