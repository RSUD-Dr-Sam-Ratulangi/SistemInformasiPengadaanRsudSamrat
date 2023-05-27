package com.example.pengadaanrsudsamrat;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.logging.Logger;

/**
 * The type Pengadaan rsud samrat application.
 */
@SpringBootApplication

public class PengadaanRsudSamratApplication {

    /**
     * The entry point of application.
     *
     * @param args the input arguments
     */
    public static void main(String[] args) {

        SpringApplication.run(PengadaanRsudSamratApplication.class, args);
        Logger.getLogger("com.example").info("!");

    }

}
