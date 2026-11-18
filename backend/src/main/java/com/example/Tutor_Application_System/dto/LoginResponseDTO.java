package com.example.Tutor_Application_System.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private long userId;
    private String token;
    private String username;
    private String role;
}