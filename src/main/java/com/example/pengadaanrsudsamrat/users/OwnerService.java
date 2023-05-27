package com.example.pengadaanrsudsamrat.users;

import com.example.pengadaanrsudsamrat.users.DTO.OwnerRequestDTO;
import com.example.pengadaanrsudsamrat.users.DTO.OwnerResponseDTO;

public interface OwnerService {
    OwnerResponseDTO createOwner(OwnerRequestDTO ownerRequestDTO);
    OwnerResponseDTO getOwnerById(Long id);

    OwnerResponseDTO login(OwnerRequestDTO ownerRequestDTO);
}

