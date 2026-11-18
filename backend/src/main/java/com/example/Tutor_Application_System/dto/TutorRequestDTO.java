package com.example.Tutor_Application_System.dto;

import com.example.Tutor_Application_System.enums.ApplicationStatusenum;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Tutor Request DTO")
public class TutorRequestDTO {

    @Schema(
        description = "Full name of the tutor",
        example = "Your Name"
    )
    @NotBlank(message = "Name cannot be Empty")
    @Size(min = 2, max = 100, message = "Name must be 2-100 characters")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Name must contain only letters and spaces")
    private String name;

    @Schema(
        description = "Subject the tutor specializes in",
        example = "Mathematics"
    )
    @NotBlank(message = "Subject is required")
    @Size(min = 2, max = 100)
    private String subject;

    @Schema(
        description = "10-digit phone number of the tutor",
        example = "9876543210"
    )
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Enter a valid phone number")
    private String phoneNumber;

    @Schema(
        description = "Current application status of the tutor",
        example = "DRAFT"
    )
    @NotNull(message = "Status is required")
    private ApplicationStatusenum status;

    @Schema(
        description = "ID of the associated user",
        example = "1"
    )
    @NotNull(message = "User ID is required")
    private Long userId;
}