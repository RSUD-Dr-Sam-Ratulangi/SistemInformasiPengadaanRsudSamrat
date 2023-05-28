package com.example.UserTokenGenerator;

import com.example.UserTokenGenerator.Role.RoleRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserTokenGenerator {


    RoleRepository roleRepository;



    public static void main(String[] args) {
        SpringApplication.run(UserTokenGenerator.class, args);



    }

}
