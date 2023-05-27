package com.example.pengadaanrsudsamrat.users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnerRepository extends JpaRepository<OwnerModel,Long> {
    Optional<Object> findByUsernameAndPassword(String username, String password);
}
