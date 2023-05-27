package com.example.pengadaanrsudsamrat.notifications;

import com.example.pengadaanrsudsamrat.notifications.DTO.NotificationRequestDTO;
import com.example.pengadaanrsudsamrat.notifications.DTO.NotificationResponseDTO;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationsService {

    private final ModelMapper modelMapper;
    private final NotificationsRepository notificationRepository;



    @Autowired
    public NotificationServiceImpl(ModelMapper modelMapper, NotificationsRepository notificationRepository) {
        this.modelMapper = modelMapper;
        this.notificationRepository = notificationRepository;

    }


    @Override
    public NotificationResponseDTO createNotification(NotificationRequestDTO notificationRequest) {
        NotificationsModel notification = modelMapper.map(notificationRequest, NotificationsModel.class);
        notification.setTimestamp(LocalDateTime.now());
        notification.setStatus(NotificationsModel.NotificationStatus.UNREAD);

        NotificationsModel savedNotification = notificationRepository.save(notification);

        return modelMapper.map(savedNotification, NotificationResponseDTO.class);
    }

    @Override
    public void updateNotificationStatus(Long notificationId, NotificationsModel.NotificationStatus status) {
        Optional<NotificationsModel> optionalNotification = notificationRepository.findById(notificationId);
        optionalNotification.ifPresent(notification -> {
            notification.setStatus(status);
            notificationRepository.save(notification);
        });
    }


}
