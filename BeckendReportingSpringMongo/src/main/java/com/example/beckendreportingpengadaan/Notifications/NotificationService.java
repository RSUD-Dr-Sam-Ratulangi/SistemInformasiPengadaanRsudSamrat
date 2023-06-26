package com.example.beckendreportingpengadaan.Notifications;

import com.example.beckendreportingpengadaan.Notifications.DTO.CreateNotificationRequestDTO;
import com.example.beckendreportingpengadaan.Notifications.DTO.NotificationResponseDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface NotificationService {
    NotificationResponseDTO createNotification(CreateNotificationRequestDTO request);

    Page<NotificationResponseDTO> getAllNotifications(int page, int size);

    List<NotificationResponseDTO> getNotificationsByReceiverId(Long receiverId);

    Page<NotificationResponseDTO> getNotificationsBySenderId(Long senderId, int page, int size);

  
    void deleteNotification(String notificationId);

    NotificationResponseDTO updateNotification(String notificationId);
}

