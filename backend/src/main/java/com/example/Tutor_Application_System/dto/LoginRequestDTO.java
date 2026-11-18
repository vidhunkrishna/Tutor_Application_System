package com.example.Tutor_Application_System.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(description = "Login Request DTO")
public class LoginRequestDTO {

    @Schema(
        description = "Registered username",
        example = "yourusername"
    )
    @NotBlank(message = "Username is required")
    private String username;

    @Schema(
        description = "Account password",
        example = "YourPassword@123"
    )
    @NotBlank(message = "Password is required")
    private String password;
}