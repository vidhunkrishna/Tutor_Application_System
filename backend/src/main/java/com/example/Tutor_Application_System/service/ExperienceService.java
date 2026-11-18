package com.example.Tutor_Application_System.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Tutor_Application_System.dto.ExperienceRequestDTO;
import com.example.Tutor_Application_System.dto.ExperienceResponseDTO;
import com.example.Tutor_Application_System.exception.ExperienceNotFoundException;
import com.example.Tutor_Application_System.exception.TutorNotFoundException;
import com.example.Tutor_Application_System.mapper.ExperienceMapper;
import com.example.Tutor_Application_System.models.Experience;
import com.example.Tutor_Application_System.models.Tutor;
import com.example.Tutor_Application_System.repository.ExperienceRepo;
import com.example.Tutor_Application_System.repository.TutorRepo;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepo experienceRepo;

    @Autowired
    private TutorRepo tutorRepo;

    @Autowired
    private ExperienceMapper mapper;

    public ExperienceResponseDTO createExperience(ExperienceRequestDTO dto) {

        Tutor tutor = tutorRepo.findById(dto.getTutorId())
                .orElseThrow(() ->
                        new TutorNotFoundException("Tutor not found"));

        Experience experience = mapper.toEntity(dto);

        experience.setTutor(tutor);

        Experience saved = experienceRepo.save(experience);

        return mapper.toResponseDTO(saved);
    }

    public List<ExperienceResponseDTO> getAllExperiences() {

        return experienceRepo.findAll()
                .stream()
                .map(mapper::toResponseDTO)
                .toList();
    }

    public ExperienceResponseDTO getExperienceById(Long id) {

        Experience experience = experienceRepo.findById(id)
                .orElseThrow(() ->
                        new ExperienceNotFoundException("Experience not found"));

        return mapper.toResponseDTO(experience);
    }

    public List<ExperienceResponseDTO> getExperiencesByTutor(Long tutorId) {

        return experienceRepo.findByTutorId(tutorId)
                .stream()
                .map(mapper::toResponseDTO)
                .toList();
    }

    public ExperienceResponseDTO updateExperience(Long id,
            ExperienceRequestDTO dto) {

        Experience existing = experienceRepo.findById(id)
                .orElseThrow(() ->
                        new ExperienceNotFoundException("Experience not found"));

        Tutor tutor = tutorRepo.findById(dto.getTutorId())
                .orElseThrow(() ->
                        new TutorNotFoundException("Tutor not found"));

        existing.setOrganizationName(dto.getOrganizationName());
        existing.setPosition(dto.getPosition());
        existing.setStartDate(dto.getStartDate());
        existing.setEndDate(dto.getEndDate());
        existing.setIsCurrent(dto.getIsCurrent());
        existing.setDescription(dto.getDescription());
        existing.setSubjectTaught(dto.getSubjectTaught());
        existing.setTutor(tutor);

        Experience saved = experienceRepo.save(existing);

        return mapper.toResponseDTO(saved);
    }

    public String deleteExperience(Long id) {

        experienceRepo.findById(id)
                .orElseThrow(() ->
                        new ExperienceNotFoundException("Experience not found"));

        experienceRepo.deleteById(id);

        return "Experience deleted successfully";
    }

}