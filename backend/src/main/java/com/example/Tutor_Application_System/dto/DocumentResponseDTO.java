package com.example.Tutor_Application_System.dto;

import java.time.LocalDateTime;

import com.example.Tutor_Application_System.enums.DocumentTypeenum;
import com.example.Tutor_Application_System.enums.VerificationStatusenum;

import lombok.Data;

@Data
public class DocumentResponseDTO {
    private Long id;
    private DocumentTypeenum documentType;
    private String documentUrl;
    private Long fileSize;
    private LocalDateTime uploadDate;
    private String originalFileName;
    private VerificationStatusenum verificationStatus;
    private boolean isActive;

    private Long tutorId;
    private String tutorName;
}
