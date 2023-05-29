package com.example.mysql_example.Pasien.Model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;


@Data
@NoArgsConstructor
@Entity
@Table
public class Registrasi {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;
    private String hari;
    private String dokter;




}
