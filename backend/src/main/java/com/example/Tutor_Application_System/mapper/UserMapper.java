package com.example.Tutor_Application_System.mapper;

import org.springframework.stereotype.Component;

import com.example.Tutor_Application_System.dto.UserRequestDTO;
import com.example.Tutor_Application_System.dto.UserResponseDTO;
import com.example.Tutor_Application_System.models.User;

@Component
public class UserMapper {
    public User toEntity(UserRequestDTO dto){
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPasswordHash(dto.getPassword());
        user.setPhonenumber(dto.getPhonenumber());
        user.setRole(dto.getRole());
        user.setActive(dto.isActive());
        return user;
    }     

    public UserResponseDTO toResponseDTO(User user){
        UserResponseDTO dto = new UserResponseDTO();
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setPhonenumber(user.getPhonenumber());
        dto.setActive(user.isActive());
        dto.setId(user.getId());
        return dto;
    }

}
