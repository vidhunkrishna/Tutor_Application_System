package com.example.Tutor_Application_System.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.*;
import com.example.Tutor_Application_System.dto.DocumentRequestDTO;
import com.example.Tutor_Application_System.dto.DocumentResponseDTO;
import com.example.Tutor_Application_System.service.DocumentService;

@RestController
@RequestMapping("/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PreAuthorize("hasAnyRole('TUTOR','ADMIN')")
    @PostMapping
    public DocumentResponseDTO uploadDocument(
            @Valid @RequestBody DocumentRequestDTO document){

        return documentService.uploadDocument(document);
    }

    @PreAuthorize("hasAnyRole('TUTOR','EDUCATION_MANAGER','ADMIN')")
    @GetMapping
    public List<DocumentResponseDTO> getAllDocuments(){

        return documentService.getAllDocuments();
    }

    @PreAuthorize("hasAnyRole('TUTOR','EDUCATION_MANAGER','ADMIN')")
    @GetMapping("/{id}")
    public DocumentResponseDTO getDocumentById(
            @PathVariable Long id){

        return documentService.getDocumentById(id);
    }

    @PreAuthorize("hasAnyRole('TUTOR','EDUCATION_MANAGER','ADMIN')")
    @GetMapping("/tutor/{tutorId}")
    public List<DocumentResponseDTO> getDocumentsByTutor(
            @PathVariable Long tutorId){

        return documentService.getDocumentsByTutor(tutorId);
    }
    @PreAuthorize("hasAnyRole('TUTOR','ADMIN')")
    @PutMapping("/{id}")
    public DocumentResponseDTO updateDocument(
            @PathVariable Long id,
            @Valid @RequestBody DocumentRequestDTO document){

        return documentService.updateDocument(id, document);
    }
    @PreAuthorize("hasAnyRole('EDUCATION_MANAGER','ADMIN')")
    @PutMapping("/{id}/verify")
    public DocumentResponseDTO verifyDocument(
            @PathVariable Long id){

        return documentService.verifyDocument(id);
    }
    @PreAuthorize("hasAnyRole('TUTOR','ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteDocument(
            @PathVariable Long id){

        return documentService.deleteDocument(id);
    }

}