package com.example.Tutor_Application_System.dto;

import com.example.Tutor_Application_System.enums.Roleenum;

import lombok.Data;

@Data
public class UserResponseDTO {
    private String username;
    private String email;
    private Roleenum role;
    private String phonenumber;
    private boolean active;
    private Long id;
}
