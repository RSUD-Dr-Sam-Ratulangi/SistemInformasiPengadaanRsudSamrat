package com.example.pengadaanrsudsamrat.products;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * The interface Product repository.
 */
@Repository
public interface ProductRepository extends JpaRepository<ProductModel,Long> {

    /**
     * Find by productuuid optional.
     *
     * @param uuid the uuid
     * @return the optional
     */
    Optional<ProductModel> findByProductuuid(String uuid);

    /**
     * Find by vendor vendoruuid list.
     *
     * @param vendorUuid the vendor uuid
     * @return the list
     */
    List<ProductModel> findByVendorVendoruuid(String vendorUuid);


    /**
     * Search page.
     *
     * @param keyword  the keyword
     * @param pageable the pageable
     * @return the page
     */
    @Query("SELECT p FROM ProductModel p WHERE CONCAT(p.name, p.description, p.vendor.name) LIKE %:keyword%")
    Page<ProductModel> search(@Param("keyword") String keyword, Pageable pageable);


    Page<ProductModel> findByCategoriesName(String categoryName, Pageable pageable);
}
