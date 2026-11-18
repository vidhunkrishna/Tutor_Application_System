package com.example.Tutor_Application_System.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.*;
import com.example.Tutor_Application_System.dto.QualificationRequestDTO;
import com.example.Tutor_Application_System.dto.QualificationResponseDTO;
import com.example.Tutor_Application_System.service.QualificationService;

@RestController
@RequestMapping("/qualifications")
public class QualificationController {

    @Autowired
    private QualificationService qualificationService;

    @PreAuthorize("hasAnyRole('TUTOR','EDUCATION_MANAGER','ADMIN')")
    @PostMapping
    public QualificationResponseDTO createQualification(
            @Valid @RequestBody QualificationRequestDTO qualification){

        return qualificationService.createQualification(qualification);
    }

    @PreAuthorize("hasAnyRole('TUTOR','EDUCATION_MANAGER','ADMIN')")
    @GetMapping
    public List<QualificationResponseDTO> getAllQualifications(){

        return qualificationService.getAllQualifications();
    }

    @PreAuthorize("hasAnyRole('TUTOR','EDUCATION_MANAGER','ADMIN')")
    @GetMapping("/{id}")
    public QualificationResponseDTO getQualificationById(
            @PathVariable Long id){

        return qualificationService.getQualificationById(id);
    }

    @PreAuthorize("hasAnyRole('TUTOR','EDUCATION_MANAGER','ADMIN')")
    @GetMapping("/tutor/{tutorId}")
    public List<QualificationResponseDTO> getQualificationsByTutor(
            @PathVariable Long tutorId){

        return qualificationService.getQualificationsByTutor(tutorId);
    }

    @PreAuthorize("hasAnyRole('TUTOR','EDUCATION_MANAGER','ADMIN')")
    @PutMapping("/{id}")
    public QualificationResponseDTO updateQualification(
            @PathVariable Long id,
            @Valid @RequestBody QualificationRequestDTO qualification){

        return qualificationService.updateQualification(id, qualification);
    }
    @PreAuthorize("hasAnyRole('EDUCATION_MANAGER','ADMIN')")
    @PutMapping("/{id}/verify")
    public QualificationResponseDTO verifyQualification(
            @PathVariable Long id){

        return qualificationService.verifyQualification(id);
    }
    @PreAuthorize("hasAnyRole('TUTOR','ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteQualification(
            @PathVariable Long id){

        return qualificationService.deleteQualification(id);
    }

}