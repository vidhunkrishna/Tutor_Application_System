package com.example.Tutor_Application_System.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Tutor_Application_System.models.User;


public interface UserRepo extends JpaRepository<User,Long>{
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);  
}
