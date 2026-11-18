package com.example.Tutor_Application_System.mapper;

import org.springframework.stereotype.Component;

import com.example.Tutor_Application_System.dto.DocumentRequestDTO;
import com.example.Tutor_Application_System.dto.DocumentResponseDTO;
import com.example.Tutor_Application_System.models.Document;

@Component
public class DocumentMapper {

    public Document toEntity(DocumentRequestDTO dto){

        Document document = new Document();

        document.setDocumentType(dto.getDocumentType());
        document.setDocumentUrl(dto.getDocumentUrl());
        document.setOriginalFileName(dto.getOriginalFileName());
        document.setFileSize(dto.getFileSize());
        document.setUploadDate(dto.getUploadDate());
        document.setVerificationStatus(dto.getVerificationStatus());
        document.setIsActive(dto.isActive());

        return document;
    }

    public DocumentResponseDTO toResponseDTO(Document document){

        DocumentResponseDTO dto = new DocumentResponseDTO();

        dto.setId(document.getId());
        dto.setDocumentType(document.getDocumentType());
        dto.setDocumentUrl(document.getDocumentUrl());
        dto.setOriginalFileName(document.getOriginalFileName());
        dto.setFileSize(document.getFileSize());
        dto.setUploadDate(document.getUploadDate());
        dto.setVerificationStatus(document.getVerificationStatus());
        dto.setActive(document.getIsActive());

        if(document.getTutor()!=null){
            dto.setTutorId(document.getTutor().getId());
            dto.setTutorName(document.getTutor().getName());
        }

        return dto;
    }
}