package com.example.mysql_example.Pasien.Model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface pasienRepo extends JpaRepository<Pasien, Long> {


}
