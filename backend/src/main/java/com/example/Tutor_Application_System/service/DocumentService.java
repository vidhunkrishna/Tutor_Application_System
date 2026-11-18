package com.example.Tutor_Application_System.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Tutor_Application_System.dto.DocumentRequestDTO;
import com.example.Tutor_Application_System.dto.DocumentResponseDTO;
import com.example.Tutor_Application_System.enums.VerificationStatusenum;
import com.example.Tutor_Application_System.exception.DocumentNotFoundException;
import com.example.Tutor_Application_System.exception.TutorNotFoundException;
import com.example.Tutor_Application_System.mapper.DocumentMapper;
import com.example.Tutor_Application_System.models.Document;
import com.example.Tutor_Application_System.models.Tutor;
import com.example.Tutor_Application_System.repository.DocumentRepo;
import com.example.Tutor_Application_System.repository.TutorRepo;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepo documentRepo;
    @Autowired
    private TutorRepo tutorRepo;
    @Autowired
    private DocumentMapper mapper;
    public DocumentResponseDTO uploadDocument(DocumentRequestDTO dto){

    Tutor existingTutor = tutorRepo.findById(dto.getTutorId())
            .orElseThrow(() -> new TutorNotFoundException("Tutor not found"));
    
    Document document = mapper.toEntity(dto);
    document.setTutor(existingTutor);

    document.setUploadDate(LocalDateTime.now());
    document.setVerificationStatus(VerificationStatusenum.PENDING);
    document.setIsActive(true);

    return mapper.toResponseDTO(documentRepo.save(document));
}

    public List<DocumentResponseDTO> getAllDocuments(){

        return documentRepo.findAll().stream().map(mapper::toResponseDTO).toList();
    }

    public DocumentResponseDTO getDocumentById(Long id){

        return mapper.toResponseDTO(documentRepo.findById(id)
                .orElseThrow(() ->
                new DocumentNotFoundException("Document not found")));
    }

    public List<DocumentResponseDTO> getDocumentsByTutor(Long tutorId){

        return documentRepo.findByTutorId(tutorId).stream().map(mapper::toResponseDTO).toList();
    }

    public DocumentResponseDTO updateDocument(Long id, DocumentRequestDTO dto){

        Document existing =
                documentRepo.findById(id)
                .orElseThrow(() ->
                new DocumentNotFoundException("Document not found"));
        Tutor tutor = tutorRepo.findById(dto.getTutorId()).orElseThrow(()->new TutorNotFoundException("Tutor Not Found"));
        existing.setDocumentType(dto.getDocumentType());
        existing.setDocumentUrl(dto.getDocumentUrl());
        existing.setOriginalFileName(dto.getOriginalFileName());
        existing.setFileSize(dto.getFileSize());
        existing.setIsActive(dto.isActive());
        existing.setTutor(tutor);

        return mapper.toResponseDTO(documentRepo.save(existing));
    }

    public DocumentResponseDTO verifyDocument(Long id){

        Document document =
                documentRepo.findById(id)
                .orElseThrow(() ->
                new DocumentNotFoundException("Document not found"));

        document.setVerificationStatus(VerificationStatusenum.VERIFIED);

        return mapper.toResponseDTO(documentRepo.save(document));
    }

    public String deleteDocument(Long id){

        documentRepo.findById(id)
                .orElseThrow(() ->
                new DocumentNotFoundException("Document not found"));

        documentRepo.deleteById(id);

        return "Document deleted successfully";
    }

}