package com.example.Tutor_Application_System.repository;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Tutor_Application_System.models.Qualification;

public interface QualificationRepo extends JpaRepository<Qualification, Long>{
    List<Qualification> findByTutorId(Long tutorId);
}
