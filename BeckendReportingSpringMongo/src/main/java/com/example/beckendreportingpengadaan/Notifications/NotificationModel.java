package com.example.beckendreportingpengadaan.Notifications;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "notifications")
public class NotificationModel {
    @Id
    private String id;
    private String sender;
    private Long senderId;
    private String receiver;
    private Long receiverId;
    private String message;
    private Date createdAt;
    private NotificationStatus notificationStatus;

    public enum NotificationStatus {
        READ,
        UNREAD
    }
}
