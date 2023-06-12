package com.example.beckendreportingpengadaan.Notifications.DTO;

import com.example.beckendreportingpengadaan.Notifications.NotificationModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDTO {
    private String id;
    private String sender;
    private Long senderId;
    private String receiver;
    private Long receiverId;
    private String message;
    private Date createdAt;
    private NotificationModel.NotificationStatus notificationStatus;
}
