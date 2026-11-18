package com.example.Tutor_Application_System.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Tutor_Application_System.dto.UserRequestDTO;
import com.example.Tutor_Application_System.dto.UserResponseDTO;
import com.example.Tutor_Application_System.exception.UserNotFoundException;
import com.example.Tutor_Application_System.mapper.UserMapper;
import com.example.Tutor_Application_System.models.User;
import com.example.Tutor_Application_System.repository.UserRepo;

@Service
public class UserService {
    
    @Autowired
    UserRepo userrepo;
    @Autowired
    UserMapper mapper;
    public UserResponseDTO registerUser(UserRequestDTO dto) {
        User user = mapper.toEntity(dto);
        User saved = userrepo.save(user);
        return mapper.toResponseDTO(saved);
    }

    public List<UserResponseDTO> getAllUser() {
        return userrepo.findAll().stream().map(mapper::toResponseDTO).toList();    
    }

    public UserResponseDTO getUserById(Long id) {
        User found = userrepo.findById(id).orElseThrow(()-> new UserNotFoundException("User Not Found"));
        return mapper.toResponseDTO(found);
    }

    public UserResponseDTO updateUser(Long id, UserRequestDTO user) {
       User existinguser = userrepo.findById(id).orElseThrow(()-> new UserNotFoundException("User Not Found"));
            existinguser.setUsername(user.getUsername());
            existinguser.setEmail(user.getEmail());
            existinguser.setPasswordHash(user.getPassword());
            existinguser.setRole(user.getRole());
            existinguser.setPhonenumber(user.getPhonenumber());
            existinguser.setActive(user.isActive());
            User saved = userrepo.save(existinguser);
            return mapper.toResponseDTO(saved);
        }

    public String deleteUser(Long id) {
        userrepo.findById(id).orElseThrow(()-> new UserNotFoundException("User Not Found"));
        userrepo.deleteById(id);
        return "User deleted successfully";
    }
}
