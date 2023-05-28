package com.example.mysql_example.repo;

import com.example.mysql_example.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepo extends JpaRepository<Address,Long> {



}
