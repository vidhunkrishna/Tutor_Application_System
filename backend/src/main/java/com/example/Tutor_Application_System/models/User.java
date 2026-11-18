package com.example.Tutor_Application_System.models;

import com.example.Tutor_Application_System.enums.Roleenum;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String passwordHash;
    @Enumerated(EnumType.STRING)
    private Roleenum role;
    private String phonenumber;
    private boolean isActive;
    @OneToOne(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private Tutor tutor;
}
