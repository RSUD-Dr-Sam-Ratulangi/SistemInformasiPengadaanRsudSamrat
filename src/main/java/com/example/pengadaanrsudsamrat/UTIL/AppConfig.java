package com.example.pengadaanrsudsamrat.UTIL;

import com.example.pengadaanrsudsamrat.vendor.VendorModel;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ConcurrentHashMap;

/**
 * The type App config.
 */
@Configuration
@ComponentScan(basePackages = {"com.example.pengadaanrsudsamrat"})
public class AppConfig {

    /**
     * Model mapper model mapper.
     *
     * @return the model mapper
     */
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    /**
     * Vendor hash map darkzill custom hash map.
     *
     * @return the darkzill custom hash map
     */
    @Bean
    public DarkzillCustomHashMap<String, VendorModel> vendorHashMap() {
        return new DarkzillCustomHashMap<>();
    }

    /**
     * Vendor hash map 2 concurrent hash map.
     *
     * @return the concurrent hash map
     */
    @Bean
    public ConcurrentHashMap<String, VendorModel> vendorHashMap2() { return new ConcurrentHashMap<>();}
}

