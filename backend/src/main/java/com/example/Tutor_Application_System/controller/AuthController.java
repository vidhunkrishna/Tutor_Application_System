package com.example.Tutor_Application_System.controller;

import org.springframework.web.bind.annotation.*;

import com.example.Tutor_Application_System.dto.LoginRequestDTO;
import com.example.Tutor_Application_System.dto.LoginResponseDTO;
import com.example.Tutor_Application_System.dto.RegisterRequestDTO;
import com.example.Tutor_Application_System.dto.RegisterResponseDTO;
import com.example.Tutor_Application_System.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public RegisterResponseDTO register(
            @Valid @RequestBody RegisterRequestDTO dto){

        return authService.register(dto);
    }

    @PostMapping("/login")
    public LoginResponseDTO login(
            @Valid @RequestBody LoginRequestDTO dto){

        return authService.login(dto);
    }

}