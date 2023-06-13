package com.example.beckendreportingpengadaan.Notifications;

import com.example.beckendreportingpengadaan.Notifications.DTO.CreateNotificationRequestDTO;
import com.example.beckendreportingpengadaan.Notifications.DTO.NotificationResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notifikasi")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public NotificationResponseDTO createNotification(@RequestBody CreateNotificationRequestDTO request) {
        return notificationService.createNotification(request);
    }

    @GetMapping
    public Page<NotificationResponseDTO> getAllNotifications(@RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "10") int size) {
        return notificationService.getAllNotifications(page, size);
    }

    @GetMapping("/receiver/{receiverId}")
    public Page<NotificationResponseDTO> getNotificationsByReceiverId(@PathVariable Long receiverId,
                                                                      @RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "10") int size) {
        return notificationService.getNotificationsByReceiverId(receiverId, page, size);
    }

    @GetMapping("/sender/{senderId}")
    public Page<NotificationResponseDTO> getNotificationsBySenderId(@PathVariable Long senderId,
                                                                    @RequestParam(defaultValue = "0") int page,
                                                                    @RequestParam(defaultValue = "10") int size) {
        return notificationService.getNotificationsBySenderId(senderId, page, size);
    }

    @PutMapping("/{notificationId}")
    public NotificationResponseDTO updateNotification(@PathVariable String notificationId) {
        return notificationService.updateNotification(notificationId);
    }


    @DeleteMapping("/{notificationId}")
    public void deleteNotification(@PathVariable String notificationId) {
        notificationService.deleteNotification(notificationId);
    }
}
