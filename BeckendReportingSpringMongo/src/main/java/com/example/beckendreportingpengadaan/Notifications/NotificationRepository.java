package com.example.beckendreportingpengadaan.Notifications;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<NotificationModel, String> {
    Page<NotificationModel> findByReceiverId(Long receiverId, Pageable pageable);
    Page<NotificationModel> findBySenderId(Long senderId, Pageable pageable);
}
