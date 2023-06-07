package com.example.mysql_example.Pasien.Model;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class pasienService {


    @Autowired
    pasienRepo pasienrepo;

    public List<Pasien> simpanPasienBaru(List<Pasien> pasien) {


        return pasienrepo.saveAll(pasien);

    }

    public List<Pasien> lihatPasienSemua() {

        return pasienrepo.findAll();
    }
}
