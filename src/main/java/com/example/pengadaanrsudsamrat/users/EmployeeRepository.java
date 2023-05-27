package com.example.pengadaanrsudsamrat.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel,Long> {
    Optional<EmployeeModel> findByUsername(String username);
}
