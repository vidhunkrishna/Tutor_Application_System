package com.example.Tutor_Application_System.dto;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Experience Request DTO")
public class ExperienceRequestDTO {

    @Schema(
        description = "Name of the organization where the tutor worked",
        example = "ABC Technologies Pvt. Ltd."
    )
    @NotBlank(message = "Organization name is required")
    @Size(min = 2, max = 200)
    private String organizationName;

    @Schema(
        description = "Job title or designation",
        example = "Software Engineer"
    )
    @NotBlank(message = "Position is required")
    @Size(min = 2, max = 100)
    private String position;

    @Schema(
        description = "Employment start date",
        example = "2023-06-01"
    )
    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @Schema(
        description = "Employment end date (leave empty if currently employed)",
        example = "2025-05-31"
    )
    private LocalDate endDate;

    @Schema(
        description = "Whether this is the tutor's current job",
        example = "false"
    )
    private Boolean isCurrent;

    @Schema(
        description = "Brief description of the work experience",
        example = "Worked as a Java Backend Developer developing REST APIs using Spring Boot."
    )
    @Size(max = 1000)
    private String description;

    @Schema(
        description = "Subject taught or area of expertise",
        example = "Java Programming"
    )
    @NotBlank(message = "Subject taught is required")
    @Size(min = 2, max = 100)
    private String subjectTaught;

    @Schema(
        description = "ID of the associated tutor",
        example = "1"
    )
    @NotNull(message = "Tutor Id is required")
    private Long tutorId;
}