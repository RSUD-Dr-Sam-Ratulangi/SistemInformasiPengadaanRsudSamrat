package com.example.beckendreportingpengadaan.Notifications;

import com.example.beckendreportingpengadaan.Exception.EntityNotFoundException;
import com.example.beckendreportingpengadaan.Notifications.DTO.CreateNotificationRequestDTO;
import com.example.beckendreportingpengadaan.Notifications.DTO.NotificationResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final ModelMapper modelMapper;

    public NotificationServiceImpl(NotificationRepository notificationRepository, ModelMapper modelMapper) {
        this.notificationRepository = notificationRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public NotificationResponseDTO createNotification(CreateNotificationRequestDTO request) {
        NotificationModel notification = modelMapper.map(request, NotificationModel.class);
        notification.setCreatedAt(new Date());
        notification.setNotificationStatus(NotificationModel.NotificationStatus.UNREAD);

        NotificationModel savedNotification = notificationRepository.save(notification);

        return modelMapper.map(savedNotification, NotificationResponseDTO.class);
    }


    @Override
    public Page<NotificationResponseDTO> getAllNotifications(int page, int size) {
        Page<NotificationModel> notificationPage = notificationRepository.findAll(PageRequest.of(page, size));
        return notificationPage.map(notification -> modelMapper.map(notification, NotificationResponseDTO.class));
    }

    @Override
    public Page<NotificationResponseDTO> getNotificationsByReceiverId(Long receiverId, int page, int size) {
        Page<NotificationModel> notificationPage = notificationRepository.findByReceiverId(receiverId, PageRequest.of(page, size));
        return notificationPage.map(notification -> modelMapper.map(notification, NotificationResponseDTO.class));
    }

    @Override
    public Page<NotificationResponseDTO> getNotificationsBySenderId(Long senderId, int page, int size) {
        Page<NotificationModel> notificationPage = notificationRepository.findBySenderId(senderId, PageRequest.of(page, size));
        return notificationPage.map(notification -> modelMapper.map(notification, NotificationResponseDTO.class));
    }

    @Override
    public NotificationResponseDTO updateNotification(String notificationId) {
        NotificationModel notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found"));

        // Do not update the notification status
        // notification.setNotificationStatus(NotificationModel.NotificationStatus.READ);

        NotificationModel updatedNotification = notificationRepository.save(notification);

        return modelMapper.map(updatedNotification, NotificationResponseDTO.class);
    }




    @Override
    public void deleteNotification(String notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
