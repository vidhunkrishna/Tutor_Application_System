package com.example.Tutor_Application_System.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Tutor_Application_System.dto.ApplicationRequestDTO;
import com.example.Tutor_Application_System.dto.ApplicationResponseDTO;
import com.example.Tutor_Application_System.enums.ApplicationStatusenum;
import com.example.Tutor_Application_System.exception.ApplicationNotFoundException;
import com.example.Tutor_Application_System.exception.TutorNotFoundException;
import com.example.Tutor_Application_System.mapper.ApplicationMapper;
import com.example.Tutor_Application_System.models.Application;
import com.example.Tutor_Application_System.models.Tutor;
import com.example.Tutor_Application_System.repository.ApplicationRepo;
import com.example.Tutor_Application_System.repository.TutorRepo;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepo applicationRepo;
    @Autowired
    private TutorRepo tutorRepo;
    @Autowired
    private ApplicationMapper mapper;
    public ApplicationResponseDTO createApplication(ApplicationRequestDTO dto) {

        Tutor existingTutor = tutorRepo.findById(dto.getTutorId())
                .orElseThrow(() -> new TutorNotFoundException("Tutor not found"));

        Application application = mapper.toEntity(dto);

        application.setTutor(existingTutor);

        application.setSubmissionDate(LocalDateTime.now());
        application.setApplicationStatus(ApplicationStatusenum.DRAFT);

        return mapper.toResponseDTO(applicationRepo.save(application));
    }

    public List<ApplicationResponseDTO> getAllApplications() {

        return applicationRepo.findAll().stream().map(mapper::toResponseDTO).toList();
    }

    public ApplicationResponseDTO getApplicationById(Long id) {

        return mapper.toResponseDTO(applicationRepo.findById(id)
                .orElseThrow(() ->
                        new ApplicationNotFoundException("Application not found")));
    }

    public ApplicationResponseDTO updateApplication(Long id, ApplicationRequestDTO dto) {

        Application existing =
                applicationRepo.findById(id)
                .orElseThrow(() ->
                        new ApplicationNotFoundException("Application not found"));

        
        existing.setRejectionReason(dto.getRejectionReason());
        Tutor existingTutor = tutorRepo.findById(dto.getTutorId())
        .orElseThrow(() -> new TutorNotFoundException("Tutor not found"));

        existing.setTutor(existingTutor);
        return mapper.toResponseDTO(applicationRepo.save(existing));
    }

    public String deleteApplication(Long id) {

        applicationRepo.findById(id)
                .orElseThrow(() ->
                        new ApplicationNotFoundException("Application not found"));

        applicationRepo.deleteById(id);

        return "Application deleted successfully";
    }

    public ApplicationResponseDTO submitApplication(Long id) {

        Application application = applicationRepo.findById(id)
                .orElseThrow(() ->
                        new ApplicationNotFoundException("Application not found"));

        if (application.getApplicationStatus() == ApplicationStatusenum.REJECTED) {
            application.setApplicationStatus(ApplicationStatusenum.RESUBMITTED);
        } else {
            application.setApplicationStatus(ApplicationStatusenum.SUBMITTED);
        }


        application.setSubmissionDate(LocalDateTime.now());
        application.setRejectionReason(null);

        return mapper.toResponseDTO(applicationRepo.save(application));
    }

    public ApplicationResponseDTO approveApplication(Long id) {

        Application application = applicationRepo.findById(id)
                .orElseThrow(() ->
                        new ApplicationNotFoundException("Application not found"));

        application.setApplicationStatus(ApplicationStatusenum.APPROVED);
        application.setApprovalDate(LocalDateTime.now());
        Tutor tutor = application.getTutor();
        tutor.setStatus(ApplicationStatusenum.APPROVED);
        tutorRepo.save(tutor);

        return mapper.toResponseDTO(applicationRepo.save(application));
    }

    public ApplicationResponseDTO rejectApplication(Long id, String reason) {

        Application application = applicationRepo.findById(id)
                .orElseThrow(() ->
                        new ApplicationNotFoundException("Application not found"));

        application.setApplicationStatus(ApplicationStatusenum.REJECTED);
        application.setReviewDate(LocalDateTime.now());
        application.setRejectionReason(reason);
        Tutor tutor = application.getTutor();
        tutor.setStatus(ApplicationStatusenum.REJECTED);
        tutorRepo.save(tutor);

        return mapper.toResponseDTO(applicationRepo.save(application));
    }

    public List<ApplicationResponseDTO> getApplicationsByStatus(ApplicationStatusenum status) {

        return applicationRepo.findByApplicationStatus(status).stream().map(mapper::toResponseDTO).toList();
    }
    public ApplicationResponseDTO getApplicationByTutor(Long tutorId) {

        return mapper.toResponseDTO(
            applicationRepo.findTopByTutorIdOrderByIdDesc(tutorId)
                .orElseThrow(() ->
                    new ApplicationNotFoundException("Application not found"))
        );
    }
}