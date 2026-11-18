package com.example.Tutor_Application_System.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.Tutor_Application_System.dto.ExperienceRequestDTO;
import com.example.Tutor_Application_System.dto.ExperienceResponseDTO;
import com.example.Tutor_Application_System.service.ExperienceService;
import jakarta.validation.*;
@RestController
@RequestMapping("/experiences")
public class ExperienceController {

    @Autowired
    private ExperienceService experienceService;

    @PreAuthorize("hasAnyRole('TUTOR','ADMIN')")
    @PostMapping
    public ExperienceResponseDTO createExperience(
            @Valid @RequestBody ExperienceRequestDTO dto) {

        return experienceService.createExperience(dto);
    }

    @PreAuthorize("hasAnyRole('TUTOR','EDUCATION_MANAGER','ADMIN')")
    @GetMapping
    public List<ExperienceResponseDTO> getAllExperiences() {

        return experienceService.getAllExperiences();
    }

    @PreAuthorize("hasAnyRole('TUTOR','EDUCATION_MANAGER','ADMIN')")
    @GetMapping("/{id}")
    public ExperienceResponseDTO getExperienceById(
            @PathVariable Long id) {

        return experienceService.getExperienceById(id);
    }

    @PreAuthorize("hasAnyRole('TUTOR','EDUCATION_MANAGER','ADMIN')")
    @GetMapping("/tutor/{tutorId}")
    public List<ExperienceResponseDTO> getExperiencesByTutor(
            @PathVariable Long tutorId) {

        return experienceService.getExperiencesByTutor(tutorId);
    }

    @PreAuthorize("hasAnyRole('TUTOR','ADMIN')")
    @PutMapping("/{id}")
    public ExperienceResponseDTO updateExperience(
            @PathVariable Long id,
            @Valid @RequestBody ExperienceRequestDTO dto) {

        return experienceService.updateExperience(id, dto);
    }

    @PreAuthorize("hasAnyRole('TUTOR','ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteExperience(
            @PathVariable Long id) {

        return experienceService.deleteExperience(id);
    }

}