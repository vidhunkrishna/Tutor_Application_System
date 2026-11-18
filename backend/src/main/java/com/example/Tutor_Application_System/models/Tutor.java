package com.example.Tutor_Application_System.models;

import java.util.List;

import com.example.Tutor_Application_System.enums.ApplicationStatusenum;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Tutor {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String subject;
    private String phoneNumber;
    @Enumerated(EnumType.STRING)
    private ApplicationStatusenum status;
    @OneToOne
    @JoinColumn(name="user_id")
    @JsonIgnoreProperties("tutor")
    private User user;
    @OneToMany(mappedBy="tutor", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("tutor")
    private List<Application> applications;
    @OneToMany(mappedBy="tutor", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("tutor")
    private List<Qualification> qualifications;
    @OneToMany(mappedBy="tutor", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("tutor")
    private List<Document> documents;
    @OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("tutor")
    private List<Experience> experiences;
}