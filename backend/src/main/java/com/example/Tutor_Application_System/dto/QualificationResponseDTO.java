package com.example.Tutor_Application_System.dto;

import java.time.LocalDateTime;

import com.example.Tutor_Application_System.enums.VerificationStatusenum;

import lombok.Data;

@Data
public class QualificationResponseDTO {

    private Long id;

    private String degreeType;

    private String institution;

    private int graduationYear;

    private VerificationStatusenum verificationStatus;

    private LocalDateTime verificationDate;

    private Long tutorId;
    private String tutorName;

}