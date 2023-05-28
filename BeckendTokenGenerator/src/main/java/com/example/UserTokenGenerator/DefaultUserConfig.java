package com.example.UserTokenGenerator;

import com.example.UserTokenGenerator.Role.RoleModel;
import com.example.UserTokenGenerator.Role.RoleRepository;
import com.example.UserTokenGenerator.User.UserModel;
import com.example.UserTokenGenerator.User.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;


@Configuration
public class DefaultUserConfig {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void createDefaultAdminUser() {
        // Check if an admin user already exists
        UserModel existingAdminUser = userRepository.findByUsername("admin");
        if (existingAdminUser != null) {
            // If an admin user already exists, delete it
            userRepository.delete(existingAdminUser);
        }
        UserModel existingVendorUser = userRepository.findByUsername("vendor");
        if (existingVendorUser != null) {
            // If an admin user already exists, delete it
            userRepository.delete(existingVendorUser);
        }

        UserModel existingHospitalUser = userRepository.findByUsername("hospital");
        if (existingAdminUser != null) {
            // If an admin user already exists, delete it
            userRepository.delete(existingHospitalUser);
        }

        // Create an ADMIN role
        RoleModel adminRole = new RoleModel();
        adminRole.setName("ADMIN");

        // Save the ADMIN role to the database
        roleRepository.save(adminRole);

        // Create a new user with ADMIN role
        UserModel adminUser = new UserModel();
        adminUser.setUsername("admin");
        adminUser.setPassword(passwordEncoder.encode("adminpassword"));
        adminUser.getRoles().add(adminRole);

        // Save the ADMIN user to the database
        userRepository.save(adminUser);
        RoleModel roleVendor = new RoleModel();
        roleVendor.setName("ROLE_VENDOR");
        roleRepository.save(roleVendor);

        RoleModel roleHospital = new RoleModel();
        roleHospital.setName("ROLE_HOSPITAL");
        roleRepository.save(roleHospital);

        // Create default vendor user
        UserModel userVendor = new UserModel();
        userVendor.setUsername("vendor");
        userVendor.setPassword(passwordEncoder.encode("vendorpassword"));
        Set<RoleModel> vendorRoles = new HashSet<>();
        vendorRoles.add(roleVendor);
        userVendor.setRoles(vendorRoles);
        userRepository.save(userVendor);

        // Create default hospital user
        UserModel userHospital = new UserModel();
        userHospital.setUsername("hospital");
        userHospital.setPassword(passwordEncoder.encode("hospitalpassword"));
        Set<RoleModel> hospitalRoles = new HashSet<>();
        hospitalRoles.add(roleHospital);
        userHospital.setRoles(hospitalRoles);
        userRepository.save(userHospital);
    }
}

