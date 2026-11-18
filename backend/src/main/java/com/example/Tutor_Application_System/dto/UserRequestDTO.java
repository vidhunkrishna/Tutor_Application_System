package com.example.Tutor_Application_System.dto;

import com.example.Tutor_Application_System.enums.Roleenum;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "User Request DTO")
public class UserRequestDTO {

    @Schema(
        description = "Username of the user",
        example = "yourusername"
    )
    @NotBlank(message = "Name cannot be Empty")
    @Size(min = 2, max = 100, message = "Name must be 2-100 characters")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Name must contain only letters and spaces")
    private String username;

    @Schema(
        description = "Email address of the user",
        example = "yourmail@example.com"
    )
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Please enter a valid email address")
    private String email;

    @Schema(
        description = "Role assigned to the user",
        example = "ADMIN"
    )
    @NotNull(message = "Role is required")
    private Roleenum role;

    @Schema(
        description = "10-digit phone number",
        example = "9876543210"
    )
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Enter a valid phone number")
    private String phonenumber;

    @Schema(
        description = "Password for the user account",
        example = "YourPassword@123"
    )
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @Schema(
        description = "Whether the user account is active",
        example = "true"
    )
    private boolean active;
}