package com.example.Tutor_Application_System.mapper;

import org.springframework.stereotype.Component;

import com.example.Tutor_Application_System.dto.ApplicationRequestDTO;
import com.example.Tutor_Application_System.dto.ApplicationResponseDTO;
import com.example.Tutor_Application_System.models.Application;

@Component
public class ApplicationMapper {
    
    public Application toEntity(ApplicationRequestDTO dto){
        Application app =  new Application();
        app.setApplicationStatus(dto.getApplicationStatus());
        app.setSubmissionDate(dto.getSubmissionDate());
        app.setReviewDate(dto.getReviewDate());
        app.setApprovalDate(dto.getApprovalDate());
        app.setRejectionReason(dto.getRejectionReason());
        return app;
    }
    public ApplicationResponseDTO toResponseDTO(Application app){
        ApplicationResponseDTO dto = new ApplicationResponseDTO();
        dto.setId(app.getId());
        dto.setApplicationStatus(app.getApplicationStatus());
        dto.setSubmissionDate(app.getSubmissionDate());
        dto.setReviewDate(app.getReviewDate());
        dto.setApprovalDate(app.getApprovalDate());
        dto.setRejectionReason(app.getRejectionReason());
        
        if(app.getTutor()!=null){
            dto.setTutorId(app.getTutor().getId());
            dto.setTutorName(app.getTutor().getName());
        }
        return dto;
    }
}
