package com.example.beckendreportingpengadaan.Notifications.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateNotificationRequestDTO {
    private String sender;
    private Long senderId;
    private String receiver;
    private Long receiverId;
    private String message;
}

