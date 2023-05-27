package com.example.pengadaanrsudsamrat.vendor;

import com.example.pengadaanrsudsamrat.vendor.DTO.VendorRequestDTO;
import com.example.pengadaanrsudsamrat.vendor.DTO.VendorResponseDTO;

import java.util.List;

/**
 * The interface Vendor service.
 */
public interface VendorService {
    /**
     * Find all vendors list.
     *
     * @return the list
     */
    List<VendorResponseDTO> findAllVendors(int page, int size);

    /**
     * Find vendor by uuid vendor response dto.
     *
     * @param vendorUuid the vendor uuid
     * @return the vendor response dto
     */
    VendorResponseDTO findVendorByUuid(String vendorUuid);

    /**
     * Create vendor vendor response dto.
     *
     * @param vendorRequestDTO the vendor request dto
     * @return the vendor response dto
     */
    VendorResponseDTO createVendor(VendorRequestDTO vendorRequestDTO);

    /**
     * Update vendor by uuid vendor response dto.
     *
     * @param vendorUuid       the vendor uuid
     * @param vendorRequestDTO the vendor request dto
     * @return the vendor response dto
     */
    VendorResponseDTO updateVendorByUuid(String vendorUuid, VendorRequestDTO vendorRequestDTO);


    VendorResponseDTO deleteVendorByUuid(String uuid);
    List<VendorResponseDTO> searchVendorsByName(String name);
    VendorResponseDTO findVendorByOwnerId(Long ownerId);


}
