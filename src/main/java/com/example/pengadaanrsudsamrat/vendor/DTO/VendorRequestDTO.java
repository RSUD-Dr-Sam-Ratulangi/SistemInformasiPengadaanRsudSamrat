package com.example.pengadaanrsudsamrat.vendor.DTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Vendor request dto.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorRequestDTO {
    @NotBlank(message = "Vendor name cannot be blank")
    private String name;

    @NotBlank(message = "Vendor address cannot be blank")
    private String address;

    @Pattern(regexp = "\\d{12}", message = "Phone number must be 10 digits")
    private String phoneNumber;


}
