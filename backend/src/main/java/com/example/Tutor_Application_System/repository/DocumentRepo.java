package com.example.Tutor_Application_System.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Tutor_Application_System.models.Document;

import java.util.*;

public interface DocumentRepo extends JpaRepository<Document,Long >{
    List<Document> findByTutorId(Long tutorId);
}
