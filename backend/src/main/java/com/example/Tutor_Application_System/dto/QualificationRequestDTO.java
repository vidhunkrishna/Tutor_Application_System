package com.example.Tutor_Application_System.dto;

import java.time.LocalDateTime;

import com.example.Tutor_Application_System.enums.VerificationStatusenum;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Qualification Request DTO")
public class QualificationRequestDTO {

    @Schema(
        description = "Degree or qualification obtained",
        example = "Bachelor of Engineering"
    )
    @NotBlank(message = "Degree type is required")
    private String degreeType;

    @Schema(
        description = "Name of the institution",
        example = "Sri Krishna College of Technology"
    )
    @NotBlank(message = "Institution is required")
    @Size(min = 2, max = 200, message = "Institution name must be 2-200 characters")
    private String institution;

    @Schema(
        description = "Year of graduation",
        example = "2026"
    )
    @NotNull(message = "Graduation year is required")
    @Min(value = 1950, message = "Please enter a valid graduation year")
    @Max(value = 2026, message = "Please enter a valid graduation year")
    private int graduationYear;

    @Schema(
        description = "Current verification status",
        example = "PENDING"
    )
    private VerificationStatusenum verificationStatus;

    @Schema(
        description = "Date and time when the qualification was verified",
        example = "2026-07-14T10:30:00"
    )
    private LocalDateTime verificationDate;

    @Schema(
        description = "ID of the associated tutor",
        example = "1"
    )
    @NotNull(message = "Tutor Id is required")
    private Long tutorId;
}