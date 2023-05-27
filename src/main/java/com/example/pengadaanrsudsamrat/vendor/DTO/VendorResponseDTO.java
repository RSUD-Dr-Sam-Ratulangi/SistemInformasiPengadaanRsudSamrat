package com.example.pengadaanrsudsamrat.vendor.DTO;

import com.example.pengadaanrsudsamrat.users.DTO.OwnerResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Vendor response dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorResponseDTO {
    private Long id;
    private String vendoruuid;
    private String name;
    private String address;
    private String phoneNumber;
    private OwnerResponseDTO owner;
}

