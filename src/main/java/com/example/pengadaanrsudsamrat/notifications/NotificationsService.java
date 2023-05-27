package com.example.pengadaanrsudsamrat.notifications;

import com.example.pengadaanrsudsamrat.notifications.DTO.NotificationRequestDTO;
import com.example.pengadaanrsudsamrat.notifications.DTO.NotificationResponseDTO;

import java.util.List;

public interface NotificationsService {

    NotificationResponseDTO createNotification(NotificationRequestDTO notificationRequest);
    void updateNotificationStatus(Long notificationId, NotificationsModel.NotificationStatus status);



}
