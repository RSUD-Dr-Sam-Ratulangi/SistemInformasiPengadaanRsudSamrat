package com.example.pengadaanrsudsamrat.notifications.DTO;

import com.example.pengadaanrsudsamrat.notifications.NotificationsModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDTO {

    private Long id;
    private String message;
    private LocalDateTime timestamp;
    private Long product_notifications;
    private Long vendor_notifications;
    private NotificationsModel.NotificationStatus status;


}