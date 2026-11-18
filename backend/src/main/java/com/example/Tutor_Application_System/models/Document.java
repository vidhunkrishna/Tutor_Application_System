package com.example.Tutor_Application_System.models;

import java.time.LocalDateTime;

import com.example.Tutor_Application_System.enums.DocumentTypeenum;
import com.example.Tutor_Application_System.enums.VerificationStatusenum;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Document {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private DocumentTypeenum documentType;
    private String documentUrl;
    private String originalFileName;
    private Long fileSize;
    private LocalDateTime uploadDate;
    @Enumerated(EnumType.STRING)
    private VerificationStatusenum verificationStatus;
    private Boolean isActive;
    @ManyToOne
    @JoinColumn(name="tutor_id")
    @JsonIgnoreProperties({"applications","qualifications","documents"})
    private Tutor tutor;
}
