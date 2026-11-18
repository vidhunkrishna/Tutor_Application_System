package com.example.Tutor_Application_System.models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String organizationName;

    private String position;

    private LocalDate startDate;

    private LocalDate endDate;

    private Boolean isCurrent;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String subjectTaught;

    @ManyToOne
    @JoinColumn(name = "tutor_id")
    @JsonIgnoreProperties({"applications","documents","qualifications","experiences"})
    private Tutor tutor;
}
