package com.example.Tutor_Application_System.dto;

import com.example.Tutor_Application_System.enums.ApplicationStatusenum;

import lombok.Data;

@Data
public class TutorResponseDTO {
    private Long id;
    private String name;
    private String subject;
    private String phoneNumber;
    private ApplicationStatusenum status;

    private Long userId;
    private String username;
    private String email;
}
