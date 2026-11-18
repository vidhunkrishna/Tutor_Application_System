package com.example.Tutor_Application_System.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Tutor_Application_System.models.Experience;
import java.util.*;
public interface  ExperienceRepo extends JpaRepository<Experience, Long>{
    List<Experience> findByTutorId(Long tutorId);
}
