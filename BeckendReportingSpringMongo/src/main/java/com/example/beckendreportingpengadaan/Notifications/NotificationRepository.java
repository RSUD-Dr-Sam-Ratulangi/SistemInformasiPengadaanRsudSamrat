package com.example.beckendreportingpengadaan.Notifications;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<NotificationModel, String> {
    List<NotificationModel> findByReceiverId(Long receiverId);
    Page<NotificationModel> findBySenderId(Long senderId, Pageable pageable);
}
