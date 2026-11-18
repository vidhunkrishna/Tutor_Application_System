package com.example.Tutor_Application_System.mapper;

import org.springframework.stereotype.Component;

import com.example.Tutor_Application_System.dto.TutorRequestDTO;
import com.example.Tutor_Application_System.dto.TutorResponseDTO;
import com.example.Tutor_Application_System.models.Tutor;

@Component
public class TutorMapper {

    public Tutor toEntity(TutorRequestDTO dto){

        Tutor tutor = new Tutor();

        tutor.setName(dto.getName());
        tutor.setSubject(dto.getSubject());
        tutor.setPhoneNumber(dto.getPhoneNumber());
        tutor.setStatus(dto.getStatus());

        return tutor;
    }

    public TutorResponseDTO toResponseDTO(Tutor tutor){

        TutorResponseDTO dto = new TutorResponseDTO();

        dto.setId(tutor.getId());
        dto.setName(tutor.getName());
        dto.setSubject(tutor.getSubject());
        dto.setPhoneNumber(tutor.getPhoneNumber());
        dto.setStatus(tutor.getStatus());

        if(tutor.getUser()!=null){
            dto.setUserId(tutor.getUser().getId());
            dto.setUsername(tutor.getUser().getUsername());
            dto.setEmail(tutor.getUser().getEmail());
        }

        return dto;
    }

}