package com.example.Tutor_Application_System.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Tutor_Application_System.models.Tutor;

public interface TutorRepo extends JpaRepository<Tutor, Long>{
    Optional<Tutor> findByUserId(Long userId);
}
