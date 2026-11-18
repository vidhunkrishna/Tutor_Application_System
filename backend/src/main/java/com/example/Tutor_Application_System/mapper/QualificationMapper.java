package com.example.Tutor_Application_System.mapper;

import org.springframework.stereotype.Component;

import com.example.Tutor_Application_System.dto.QualificationRequestDTO;
import com.example.Tutor_Application_System.dto.QualificationResponseDTO;
import com.example.Tutor_Application_System.models.Qualification;

@Component
public class QualificationMapper {

    public Qualification toEntity(QualificationRequestDTO dto){

        Qualification qualification = new Qualification();

        qualification.setDegreeType(dto.getDegreeType());
        qualification.setInstitution(dto.getInstitution());
        qualification.setGraduationYear(dto.getGraduationYear());
        qualification.setVerificationStatus(dto.getVerificationStatus());
        qualification.setVerificationDate(dto.getVerificationDate());

        return qualification;
    }

    public QualificationResponseDTO toResponseDTO(Qualification qualification){

        QualificationResponseDTO dto = new QualificationResponseDTO();

        dto.setId(qualification.getId());
        dto.setDegreeType(qualification.getDegreeType());
        dto.setInstitution(qualification.getInstitution());
        dto.setGraduationYear(qualification.getGraduationYear());
        dto.setVerificationStatus(qualification.getVerificationStatus());
        dto.setVerificationDate(qualification.getVerificationDate());

        if(qualification.getTutor()!=null){
            dto.setTutorId(qualification.getTutor().getId());
            dto.setTutorName(qualification.getTutor().getName());
        }

        return dto;
    }
}