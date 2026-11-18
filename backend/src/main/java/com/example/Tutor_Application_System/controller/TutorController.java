package com.example.Tutor_Application_System.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Tutor_Application_System.dto.TutorRequestDTO;
import com.example.Tutor_Application_System.dto.TutorResponseDTO;
import com.example.Tutor_Application_System.service.TutorService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/tutors")
public class TutorController {

    private final TutorService tutorservice;
    

    public TutorController(TutorService tutorservice) {
        this.tutorservice = tutorservice;
    }
    @PreAuthorize("hasAnyRole('GUEST','ADMIN')")
    @PostMapping
    public TutorResponseDTO addTutor(@Valid @RequestBody TutorRequestDTO details){
        return tutorservice.addTutor(details);
    }
    @PreAuthorize("hasAnyRole('GUEST','TUTOR','EDUCATION_MANAGER','ADMIN')")
    @GetMapping
    public List<TutorResponseDTO> getAllTutors(){
        return tutorservice.getAllTutors();
    }
    @PreAuthorize("hasAnyRole('GUEST','TUTOR','EDUCATION_MANAGER','ADMIN')")
    @GetMapping("/{id}")
    public TutorResponseDTO getTutor(@PathVariable Long id) {
        return tutorservice.getTutor(id);
    }
    @PreAuthorize("hasAnyRole('TUTOR','ADMIN')")
    @PutMapping("/{id}")
    public TutorResponseDTO updateTutor(@PathVariable Long id,@Valid @RequestBody TutorRequestDTO tutor){
        return tutorservice.updateTutor(id,tutor);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping ("/{id}")
    public String deleteTutor(@PathVariable Long id){
        return tutorservice.deleteTutor(id);
    }
    @GetMapping("/user/{userId}")
    public TutorResponseDTO getTutorByUserId(@PathVariable Long userId) {
        return tutorservice.getTutorByUserId(userId);
    }
}
