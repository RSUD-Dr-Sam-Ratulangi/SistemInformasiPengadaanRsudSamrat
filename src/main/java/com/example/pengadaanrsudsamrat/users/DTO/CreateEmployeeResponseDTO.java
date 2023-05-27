package com.example.pengadaanrsudsamrat.users.DTO;

import com.example.pengadaanrsudsamrat.users.EmployeeModel;
import com.example.pengadaanrsudsamrat.users.EmployeeModel.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateEmployeeResponseDTO {
    private Long id;
    private String name;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private EmployeeModel.Role role;
}
