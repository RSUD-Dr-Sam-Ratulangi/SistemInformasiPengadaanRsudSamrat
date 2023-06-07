package com.example.UserTokenGenerator.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<RoleModel,Long> {


    RoleModel findByName(String role_admin);
}
