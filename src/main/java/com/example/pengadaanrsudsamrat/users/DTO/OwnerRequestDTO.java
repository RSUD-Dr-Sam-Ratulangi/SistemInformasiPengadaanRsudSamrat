package com.example.pengadaanrsudsamrat.users.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OwnerRequestDTO {
    private String username;
    private String password;
}

