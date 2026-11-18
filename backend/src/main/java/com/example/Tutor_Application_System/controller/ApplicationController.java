package com.example.Tutor_Application_System.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.*;
import com.example.Tutor_Application_System.dto.ApplicationRequestDTO;
import com.example.Tutor_Application_System.dto.ApplicationResponseDTO;
import com.example.Tutor_Application_System.enums.ApplicationStatusenum;
import com.example.Tutor_Application_System.service.ApplicationService;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PreAuthorize("hasRole('TUTOR')")
    @PostMapping
    public ApplicationResponseDTO createApplication(
            @Valid @RequestBody ApplicationRequestDTO application){

        return applicationService.createApplication(application);
    }

    @PreAuthorize("hasAnyRole('EDUCATION_MANAGER','ADMIN')")
    @GetMapping
    public List<ApplicationResponseDTO> getAllApplications(){

        return applicationService.getAllApplications();
    }

    @PreAuthorize("hasAnyRole('TUTOR','EDUCATION_MANAGER','ADMIN')")
    @GetMapping("/{id}")
    public ApplicationResponseDTO getApplicationById(
            @PathVariable Long id){

        return applicationService.getApplicationById(id);
    }

    @PreAuthorize("hasRole('TUTOR')")
    @PutMapping("/{id}")
    public ApplicationResponseDTO updateApplication(
            @PathVariable Long id,
            @Valid @RequestBody ApplicationRequestDTO application){

        return applicationService.updateApplication(id, application);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteApplication(
            @PathVariable Long id){

        return applicationService.deleteApplication(id);
    }

    @PreAuthorize("hasRole('TUTOR')")
    @PutMapping("/{id}/submit")
    public ApplicationResponseDTO submitApplication(
            @PathVariable Long id){

        return applicationService.submitApplication(id);
    }

    @PreAuthorize("hasAnyRole('EDUCATION_MANAGER','ADMIN')")
    @PutMapping("/{id}/approve")
    public ApplicationResponseDTO approveApplication(
            @PathVariable Long id){

        return applicationService.approveApplication(id);
    }

    @PreAuthorize("hasAnyRole('EDUCATION_MANAGER','ADMIN')")
    @PutMapping("/{id}/reject")
    public ApplicationResponseDTO rejectApplication(
            @PathVariable Long id,
            @RequestParam String reason){

        return applicationService.rejectApplication(id, reason);
    }

    @PreAuthorize("hasAnyRole('EDUCATION_MANAGER','ADMIN')")
    @GetMapping("/status/{status}")
    public List<ApplicationResponseDTO> getApplicationsByStatus(
            @PathVariable ApplicationStatusenum status){

        return applicationService.getApplicationsByStatus(status);
    }
    @PreAuthorize("hasRole('TUTOR')")
    @GetMapping("/tutor/{tutorId}")
    public ApplicationResponseDTO getApplicationByTutor(
            @PathVariable Long tutorId) {

        return applicationService.getApplicationByTutor(tutorId);
    }
}