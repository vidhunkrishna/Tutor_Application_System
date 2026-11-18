package com.example.Tutor_Application_System.dto;

import java.time.LocalDateTime;

import com.example.Tutor_Application_System.enums.DocumentTypeenum;
import com.example.Tutor_Application_System.enums.VerificationStatusenum;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
@Schema(description = "Document Request DTO")
public class DocumentRequestDTO {

    @Schema(
        description = "Type of document being uploaded",
        example = "AADHAR"
    )
    @NotNull(message = "Document type is required")
    private DocumentTypeenum documentType;

    @Schema(
        description = "URL where the uploaded document is stored",
        example = "https://example.com/documents/aadhar.pdf"
    )
    @NotBlank(message = "Document URL is required")
    private String documentUrl;

    @Schema(
        description = "Size of the uploaded document in bytes",
        example = "245760"
    )
    @NotNull(message = "File size is required")
    @Positive(message = "File size must be greater than zero")
    private Long fileSize;

    @Schema(
        description = "Date and time when the document was uploaded",
        example = "2026-07-14T10:30:00"
    )
    private LocalDateTime uploadDate;

    @Schema(
        description = "Original name of the uploaded file",
        example = "aadhar_card.pdf"
    )
    private String originalFileName;

    @Schema(
        description = "Verification status of the document",
        example = "PENDING"
    )
    private VerificationStatusenum verificationStatus;

    @Schema(
        description = "Whether the document is active",
        example = "true"
    )
    private boolean isActive;

    @Schema(
        description = "ID of the associated tutor",
        example = "1"
    )
    @NotNull(message = "Tutor Id is required")
    private Long tutorId;
}