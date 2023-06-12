package com.example.beckendreportingpengadaan.Util;

import com.example.beckendreportingpengadaan.Notifications.DTO.CreateNotificationRequestDTO;
import com.example.beckendreportingpengadaan.Notifications.NotificationModel;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Configure ModelMapper to use strict matching
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // Explicitly map the conflicting properties
        modelMapper.createTypeMap(CreateNotificationRequestDTO.class, NotificationModel.class)
                .addMapping(CreateNotificationRequestDTO::getSenderId, (dest, value) -> dest.setSenderId((Long) value))
                .addMapping(CreateNotificationRequestDTO::getReceiverId, (dest, value) -> dest.setReceiverId((Long) value));

        return modelMapper;
    }
}
