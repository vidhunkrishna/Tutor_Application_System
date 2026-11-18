package com.example.Tutor_Application_System.dto;

import com.example.Tutor_Application_System.enums.Roleenum;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(description = "User Registration Request DTO")
public class RegisterRequestDTO {

    @Schema(
        description = "Username for the new account",
        example = "yourusername"
    )
    @NotBlank(message = "Username is required")
    private String username;

    @Schema(
        description = "Email address of the user",
        example = "yourmail@example.com"
    )
    @Email(message = "Please enter a valid email address")
    @NotBlank(message = "Email is required")
    private String email;

    @Schema(
        description = "Password for the account",
        example = "YourPassword@123"
    )
    @NotBlank(message = "Password is required")
    private String password;

    @Schema(
        description = "10-digit phone number",
        example = "9876543210"
    )
    @NotBlank(message = "Phone number is required")
    private String phonenumber;

    @Schema(
        description = "Role assigned during registration",
        example = "GUEST"
    )
    @NotNull(message = "Role is required")
    private Roleenum role;
}