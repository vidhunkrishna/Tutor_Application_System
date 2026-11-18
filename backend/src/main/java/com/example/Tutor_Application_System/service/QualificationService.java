package com.example.Tutor_Application_System.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Tutor_Application_System.dto.QualificationRequestDTO;
import com.example.Tutor_Application_System.dto.QualificationResponseDTO;
import com.example.Tutor_Application_System.enums.VerificationStatusenum;
import com.example.Tutor_Application_System.exception.QualificationNotFoundException;
import com.example.Tutor_Application_System.exception.TutorNotFoundException;
import com.example.Tutor_Application_System.mapper.QualificationMapper;
import com.example.Tutor_Application_System.models.Qualification;
import com.example.Tutor_Application_System.models.Tutor;
import com.example.Tutor_Application_System.repository.QualificationRepo;
import com.example.Tutor_Application_System.repository.TutorRepo;

@Service
public class QualificationService {

    @Autowired
    private QualificationRepo qualificationRepo;
    @Autowired
    private TutorRepo tutorRepo;
    @Autowired
    private QualificationMapper mapper;
    public QualificationResponseDTO createQualification(QualificationRequestDTO dto){
        Tutor existingTutor = tutorRepo.findById(
            dto.getTutorId())
            .orElseThrow(() ->
                    new TutorNotFoundException("Tutor not found"));
        Qualification qualification = mapper.toEntity(dto);
        qualification.setTutor(existingTutor);
        qualification.setVerificationDate(LocalDateTime.now());
        qualification.setVerificationStatus(VerificationStatusenum.PENDING);

        Qualification saved = qualificationRepo.save(qualification);
        return mapper.toResponseDTO(saved);
    }

    public List<QualificationResponseDTO> getAllQualifications(){

        return qualificationRepo.findAll().stream().map(mapper::toResponseDTO).toList();
    }

    public QualificationResponseDTO getQualificationById(Long id){

        Qualification get = qualificationRepo.findById(id)
                .orElseThrow(() ->
                new QualificationNotFoundException("Qualification not found"));
        return mapper.toResponseDTO(get);
    }

    public List<QualificationResponseDTO> getQualificationsByTutor(Long tutorId){

        return qualificationRepo.findByTutorId(tutorId).stream().map(mapper::toResponseDTO).toList();
    }

    public QualificationResponseDTO updateQualification(Long id,
                                             QualificationRequestDTO dto){

        Qualification existing =
                qualificationRepo.findById(id)
                .orElseThrow(() ->
                new QualificationNotFoundException("Qualification not found"));
        Tutor tutor = tutorRepo.findById(dto.getTutorId())
            .orElseThrow(() ->
                    new TutorNotFoundException("Tutor not found"));
        existing.setDegreeType(dto.getDegreeType());
        existing.setInstitution(dto.getInstitution());
        existing.setGraduationYear(dto.getGraduationYear());
        existing.setVerificationStatus(dto.getVerificationStatus());
        existing.setVerificationDate(dto.getVerificationDate());
        existing.setTutor(tutor);
        Qualification saved = qualificationRepo.save(existing);
        return mapper.toResponseDTO(saved);
    }

    public QualificationResponseDTO verifyQualification(Long id){

        Qualification qualification =
                qualificationRepo.findById(id)
                .orElseThrow(() ->
                new QualificationNotFoundException("Qualification not found"));

        qualification.setVerificationStatus(
                VerificationStatusenum.VERIFIED);

        qualification.setVerificationDate(LocalDateTime.now());

        return mapper.toResponseDTO(qualificationRepo.save(qualification));
    }

    public String deleteQualification(Long id){

        qualificationRepo.findById(id)
                .orElseThrow(() ->
                new QualificationNotFoundException("Qualification not found"));

        qualificationRepo.deleteById(id);

        return "Qualification deleted successfully";
    }

}