package com.example.pengadaanrsudsamrat.notifications.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRequestDTO {


    private String message;
    private Long vendor_notifications;
    private Long product_notifications;

}