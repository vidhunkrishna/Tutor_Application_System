package com.example.Tutor_Application_System.mapper;

import org.springframework.stereotype.Component;

import com.example.Tutor_Application_System.dto.ExperienceRequestDTO;
import com.example.Tutor_Application_System.dto.ExperienceResponseDTO;
import com.example.Tutor_Application_System.models.Experience;

@Component
public class ExperienceMapper {

    public Experience toEntity(ExperienceRequestDTO dto) {

        Experience experience = new Experience();

        experience.setOrganizationName(dto.getOrganizationName());
        experience.setPosition(dto.getPosition());
        experience.setStartDate(dto.getStartDate());
        experience.setEndDate(dto.getEndDate());
        experience.setIsCurrent(dto.getIsCurrent());
        experience.setDescription(dto.getDescription());
        experience.setSubjectTaught(dto.getSubjectTaught());

        return experience;
    }

    public ExperienceResponseDTO toResponseDTO(Experience experience) {

        ExperienceResponseDTO dto = new ExperienceResponseDTO();

        dto.setId(experience.getId());
        dto.setOrganizationName(experience.getOrganizationName());
        dto.setPosition(experience.getPosition());
        dto.setStartDate(experience.getStartDate());
        dto.setEndDate(experience.getEndDate());
        dto.setIsCurrent(experience.getIsCurrent());
        dto.setDescription(experience.getDescription());
        dto.setSubjectTaught(experience.getSubjectTaught());

        if (experience.getTutor() != null) {
            dto.setTutorId(experience.getTutor().getId());
            dto.setTutorName(experience.getTutor().getName());
        }

        return dto;
    }

}