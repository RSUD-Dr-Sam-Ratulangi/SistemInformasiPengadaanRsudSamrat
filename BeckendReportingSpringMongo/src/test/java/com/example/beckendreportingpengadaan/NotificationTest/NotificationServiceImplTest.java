package com.example.beckendreportingpengadaan.NotificationTest;

import com.example.beckendreportingpengadaan.Exception.EntityNotFoundException;
import com.example.beckendreportingpengadaan.Notifications.DTO.CreateNotificationRequestDTO;
import com.example.beckendreportingpengadaan.Notifications.DTO.NotificationResponseDTO;
import com.example.beckendreportingpengadaan.Notifications.NotificationModel;
import com.example.beckendreportingpengadaan.Notifications.NotificationRepository;
import com.example.beckendreportingpengadaan.Notifications.NotificationServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class NotificationServiceImplTest {

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private NotificationServiceImpl notificationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void createNotification_shouldReturnCreatedNotification() {
        // Arrange
        CreateNotificationRequestDTO requestDTO = new CreateNotificationRequestDTO();
        NotificationModel notificationModel = new NotificationModel();
        NotificationResponseDTO expectedResponseDTO = new NotificationResponseDTO();

        when(modelMapper.map(eq(requestDTO), eq(NotificationModel.class))).thenReturn(notificationModel);
        when(notificationRepository.save(eq(notificationModel))).thenReturn(notificationModel);
        when(modelMapper.map(eq(notificationModel), eq(NotificationResponseDTO.class))).thenReturn(expectedResponseDTO);

        // Act
        NotificationResponseDTO actualResponseDTO = notificationService.createNotification(requestDTO);

        // Assert
        assertEquals(expectedResponseDTO, actualResponseDTO);
        verify(notificationRepository, times(1)).save(eq(notificationModel));
    }

    @Test
    public void getAllNotifications_shouldReturnAllNotifications() {
        // Arrange
        int page = 0;
        int size = 10;
        List<NotificationModel> notificationModels = new ArrayList<>();
        notificationModels.add(new NotificationModel());
        notificationModels.add(new NotificationModel());
        Page<NotificationModel> notificationPage = new PageImpl<>(notificationModels);
        List<NotificationResponseDTO> expectedResponseDTOs = new ArrayList<>();
        expectedResponseDTOs.add(new NotificationResponseDTO());
        expectedResponseDTOs.add(new NotificationResponseDTO());

        when(notificationRepository.findAll(any(PageRequest.class))).thenReturn(notificationPage);
        when(modelMapper.map(any(NotificationModel.class), eq(NotificationResponseDTO.class)))
                .thenReturn(new NotificationResponseDTO());

        // Act
        Page<NotificationResponseDTO> actualResponseDTOs = notificationService.getAllNotifications(page, size);

        // Assert
        assertEquals(expectedResponseDTOs.size(), actualResponseDTOs.getContent().size());
        verify(notificationRepository, times(1)).findAll(any(PageRequest.class));
    }



    @Test
    public void getNotificationsBySenderId_shouldReturnNotificationsBySenderId() {
        // Arrange
        Long senderId = 1L;
        int page = 0;
        int size = 10;
        List<NotificationModel> notificationModels = new ArrayList<>();
        notificationModels.add(new NotificationModel());
        notificationModels.add(new NotificationModel());
        Page<NotificationModel> notificationPage = new PageImpl<>(notificationModels);
        List<NotificationResponseDTO> expectedResponseDTOs = new ArrayList<>();
        expectedResponseDTOs.add(new NotificationResponseDTO());
        expectedResponseDTOs.add(new NotificationResponseDTO());

        when(notificationRepository.findBySenderId(eq(senderId), any(PageRequest.class)))
                .thenReturn(notificationPage);
        when(modelMapper.map(any(NotificationModel.class), eq(NotificationResponseDTO.class)))
                .thenReturn(new NotificationResponseDTO());

        // Act
        Page<NotificationResponseDTO> actualResponseDTOs = notificationService
                .getNotificationsBySenderId(senderId, page, size);

        // Assert
        assertEquals(expectedResponseDTOs.size(), actualResponseDTOs.getContent().size());
        verify(notificationRepository, times(1)).findBySenderId(eq(senderId), any(PageRequest.class));
    }

    @Test
    public void updateNotification_shouldReturnUpdatedNotification() {
        // Arrange
        String notificationId = "1";
        NotificationModel notificationModel = new NotificationModel();
        notificationModel.setNotificationStatus(NotificationModel.NotificationStatus.UNREAD);
        NotificationModel updatedNotificationModel = new NotificationModel();
        updatedNotificationModel.setNotificationStatus(NotificationModel.NotificationStatus.READ);
        NotificationResponseDTO expectedResponseDTO = new NotificationResponseDTO();

        when(notificationRepository.findById(eq(notificationId))).thenReturn(Optional.of(notificationModel));
        when(notificationRepository.save(eq(notificationModel))).thenReturn(updatedNotificationModel);
        when(modelMapper.map(eq(updatedNotificationModel), eq(NotificationResponseDTO.class)))
                .thenReturn(expectedResponseDTO);

        // Act
        NotificationResponseDTO actualResponseDTO = notificationService.updateNotification(notificationId);

        // Assert
        assertEquals(expectedResponseDTO, actualResponseDTO);
        assertEquals(NotificationModel.NotificationStatus.READ, updatedNotificationModel.getNotificationStatus());
        verify(notificationRepository, times(1)).findById(eq(notificationId));
        verify(notificationRepository, times(1)).save(eq(notificationModel));
    }

    @Test
    public void updateNotification_withNonExistingNotification_shouldThrowEntityNotFoundException() {
        // Arrange
        String notificationId = "1";

        when(notificationRepository.findById(eq(notificationId))).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(EntityNotFoundException.class, () -> notificationService.updateNotification(notificationId));
        verify(notificationRepository, times(1)).findById(eq(notificationId));
        verify(notificationRepository, never()).save(any(NotificationModel.class));
    }

    @Test
    public void deleteNotification_shouldDeleteNotification() {
        // Arrange
        String notificationId = "1";

        // Act
        notificationService.deleteNotification(notificationId);

        // Assert
        verify(notificationRepository, times(1)).deleteById(eq(notificationId));
    }
}
