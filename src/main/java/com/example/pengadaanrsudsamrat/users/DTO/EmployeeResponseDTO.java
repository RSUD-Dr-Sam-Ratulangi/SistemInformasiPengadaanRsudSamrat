package com.example.pengadaanrsudsamrat.users.DTO;


import com.example.pengadaanrsudsamrat.users.EmployeeModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponseDTO {
    private Long id;
    private String username;
    private String email;
    private String name;
    private String phoneNumber;
    private EmployeeModel.Role role;
}