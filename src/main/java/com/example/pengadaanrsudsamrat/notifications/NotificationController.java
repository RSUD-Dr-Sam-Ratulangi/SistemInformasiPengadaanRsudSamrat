package com.example.pengadaanrsudsamrat.notifications;

import com.example.pengadaanrsudsamrat.notifications.DTO.NotificationRequestDTO;
import com.example.pengadaanrsudsamrat.notifications.DTO.NotificationResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pengadaan/dev/v1/bids/notifications")
public class NotificationController {

    private final NotificationsService notificationService;

    @Autowired
    public NotificationController(NotificationsService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public ResponseEntity<NotificationResponseDTO> createNotification(@RequestBody NotificationRequestDTO notificationRequestDTO) {
        NotificationResponseDTO notificationResponseDTO = notificationService.createNotification(notificationRequestDTO);
        return new ResponseEntity<>(notificationResponseDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{notificationId}/status")
    public ResponseEntity<Void> updateNotificationStatus(@PathVariable("notificationId") Long notificationId, @RequestParam("status") NotificationsModel.NotificationStatus status) {
        notificationService.updateNotificationStatus(notificationId, status);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
