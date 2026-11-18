package com.example.Tutor_Application_System.dto;

import java.time.LocalDateTime;

import com.example.Tutor_Application_System.enums.ApplicationStatusenum;

import lombok.Data;

@Data
public class ApplicationResponseDTO {

    private Long id;

    private ApplicationStatusenum applicationStatus;

    private LocalDateTime submissionDate;
    private LocalDateTime reviewDate;
    private LocalDateTime approvalDate;

    private String rejectionReason;

    private Long tutorId;
    private String tutorName;

}