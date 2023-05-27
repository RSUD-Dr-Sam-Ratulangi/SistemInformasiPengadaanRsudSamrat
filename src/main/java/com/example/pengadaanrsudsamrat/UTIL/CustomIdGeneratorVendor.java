package com.example.pengadaanrsudsamrat.UTIL;

import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * The type Custom id generator vendor.
 */
@Component
public class CustomIdGeneratorVendor {

    private static final String PREFIX = "VE";
    private static final String DATE_FORMAT = "yyMMdd";
    private static final String PATTERN = PREFIX + DATE_FORMAT + "%04d";
    private AtomicInteger counter = new AtomicInteger(1);

    /**
     * Generate custom id string.
     *
     * @return the string
     */
    public String generateCustomId() {
        String formattedDate = new SimpleDateFormat(DATE_FORMAT).format(new Date());
        int count = counter.getAndIncrement();
        return String.format(PATTERN, formattedDate, count);
    }
}

