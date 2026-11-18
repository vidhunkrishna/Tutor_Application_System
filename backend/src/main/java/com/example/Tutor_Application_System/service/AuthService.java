package com.example.Tutor_Application_System.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Tutor_Application_System.dto.LoginRequestDTO;
import com.example.Tutor_Application_System.dto.LoginResponseDTO;
import com.example.Tutor_Application_System.dto.RegisterRequestDTO;
import com.example.Tutor_Application_System.dto.RegisterResponseDTO;
import com.example.Tutor_Application_System.models.User;
import com.example.Tutor_Application_System.repository.UserRepo;
import com.example.Tutor_Application_System.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;
    public AuthService(UserRepo userRepo,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {

        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public RegisterResponseDTO register(RegisterRequestDTO dto) {

        if(userRepo.existsByUsername(dto.getUsername())){
            throw new RuntimeException("Username already exists");
        }

        User user = new User();

        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        user.setPhonenumber(dto.getPhonenumber());
        user.setRole(dto.getRole());
        user.setActive(true);

        User saved = userRepo.save(user);

        return new RegisterResponseDTO(
                saved.getId(),
                saved.getUsername(),
                saved.getEmail(),
                "Registration Successful"
        );
    }

    public LoginResponseDTO login(LoginRequestDTO dto){

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getUsername(),
                        dto.getPassword()
                )
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getUsername());

        String token = jwtUtil.generateToken(userDetails);
        User user = userRepo.findByUsername(dto.getUsername())
                .orElseThrow();
        return new LoginResponseDTO( 
                user.getId(),   
                token,
                user.getUsername(),
                user.getRole().name()
        );
    }

}