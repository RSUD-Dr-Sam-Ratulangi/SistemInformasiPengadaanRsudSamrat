package com.example.mysql_example.Pasien.Model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Entity
@Table
@NoArgsConstructor
@Data
@Transactional
public class Pasien {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    @Column (name = "pasien_id")
    private Long id;
    private String nama;
    private Integer umur;
    private String alamat;
    @OneToMany (cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_pasien_id",referencedColumnName = "pasien_id")
    private List<Registrasi> registrasi;




}
