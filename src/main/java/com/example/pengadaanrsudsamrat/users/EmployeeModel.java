package com.example.pengadaanrsudsamrat.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "employee")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeModel {

    public enum Role {
        EMPLOYEE,
        PP,
        PPKOM,
        PANPEN,
        KEU
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Username is mandatory")
    private String username;

    @NotBlank(message = "Password is mandatory")
    private String password;

    @Email(message = "Invalid email address")
    @NotBlank(message = "Email is mandatory")
    private String email;

    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @NotBlank(message = "Role is mandatory")
    private Role role;

    // Constructors, getters, and setters
}
