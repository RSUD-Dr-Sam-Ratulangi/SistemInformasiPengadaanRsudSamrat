package com.example.pengadaanrsudsamrat.orderitem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The interface Order item repository.
 */
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItemModel,Long> {

    /**
     * Find by product vendor id list.
     *
     * @param vendorId the vendor id
     * @return the list
     */
    List<OrderItemModel> findByProduct_Vendor_Id(Long vendorId);

    List<OrderItemModel> findByProductId(Long productId);



    List<OrderItemModel> findByProduct_Vendor_Vendoruuid(String vendorUUID);


}
