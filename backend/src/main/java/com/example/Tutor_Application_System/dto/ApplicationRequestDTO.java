package com.example.Tutor_Application_System.dto;

import java.time.LocalDateTime;

import com.example.Tutor_Application_System.enums.ApplicationStatusenum;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Application Request DTO")
public class ApplicationRequestDTO {

    @Schema(
        description = "Current status of the application",
        example = "DRAFT"
    )
    private ApplicationStatusenum applicationStatus;

    @Schema(
        description = "Date and time when the application was submitted",
        example = "2026-07-14T10:30:00"
    )
    private LocalDateTime submissionDate;

    @Schema(
        description = "Date and time when the application was reviewed",
        example = "2026-07-15T14:15:00"
    )
    private LocalDateTime reviewDate;

    @Schema(
        description = "Date and time when the application was approved",
        example = "2026-07-16T11:45:00"
    )
    private LocalDateTime approvalDate;

    @Schema(
        description = "Reason for rejecting the application, if applicable",
        example = "Required documents are incomplete."
    )
    @Size(max = 255)
    private String rejectionReason;

    @Schema(
        description = "ID of the associated tutor",
        example = "1"
    )
    @NotNull(message = "Tutor Id is required")
    private Long tutorId;
}