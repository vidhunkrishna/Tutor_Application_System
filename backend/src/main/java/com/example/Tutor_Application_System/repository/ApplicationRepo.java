package com.example.Tutor_Application_System.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Tutor_Application_System.enums.ApplicationStatusenum;
import com.example.Tutor_Application_System.models.Application;

public interface ApplicationRepo extends JpaRepository<Application,Long> {
    List<Application> findByApplicationStatus(ApplicationStatusenum status);
   Optional<Application> findTopByTutorIdOrderByIdDesc(Long tutorId);
}
