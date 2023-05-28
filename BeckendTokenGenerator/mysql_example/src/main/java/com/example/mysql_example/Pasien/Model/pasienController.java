package com.example.mysql_example.Pasien.Model;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Transactional
public class pasienController {

    @Autowired
    pasienService pasienservice;

    @PostMapping ("/simpanPasien")
    public List<Pasien>  simpanPasien (@RequestBody  List<Pasien> pasien){



        return  pasienservice.simpanPasienBaru(pasien);
    }

    @GetMapping ("/lihatPasienSemua")
    public  List<Pasien> lihatPasienSemua(){


        return pasienservice.lihatPasienSemua();
    }


}
