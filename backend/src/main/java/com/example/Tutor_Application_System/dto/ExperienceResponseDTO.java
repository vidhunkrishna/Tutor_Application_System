package com.example.Tutor_Application_System.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ExperienceResponseDTO {
    private Long id;

    private String organizationName;
    private String position;

    private LocalDate startDate;
    private LocalDate endDate;

    private Boolean isCurrent;

    private String description;

    private String subjectTaught;

    private Long tutorId;
    private String tutorName;
}
