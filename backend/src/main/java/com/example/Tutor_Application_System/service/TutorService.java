package com.example.Tutor_Application_System.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Tutor_Application_System.dto.TutorRequestDTO;
import com.example.Tutor_Application_System.dto.TutorResponseDTO;
import com.example.Tutor_Application_System.enums.Roleenum;
import com.example.Tutor_Application_System.exception.TutorNotFoundException;
import com.example.Tutor_Application_System.exception.UserNotFoundException;
import com.example.Tutor_Application_System.mapper.TutorMapper;
import com.example.Tutor_Application_System.models.Tutor;
import com.example.Tutor_Application_System.models.User;
import com.example.Tutor_Application_System.repository.TutorRepo;
import com.example.Tutor_Application_System.repository.UserRepo;
@Service
public class TutorService {
    
    @Autowired
    TutorRepo tutorRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    TutorMapper mapper;

    public TutorResponseDTO addTutor(TutorRequestDTO dto) {
    User existingUser = userRepo.findById(dto.getUserId())
            .orElseThrow(() -> new UserNotFoundException("User not found"));

    Tutor tutor = mapper.toEntity(dto);

    tutor.setUser(existingUser);

    existingUser.setRole(Roleenum.TUTOR);

    userRepo.save(existingUser);

    Tutor saved = tutorRepo.save(tutor);

    return mapper.toResponseDTO(saved);
}

    public List<TutorResponseDTO> getAllTutors(){
        return tutorRepo.findAll().stream().map(mapper::toResponseDTO).toList();
    }

    public TutorResponseDTO updateTutor(Long id, TutorRequestDTO dto) {

    Tutor existingTutor = tutorRepo.findById(id)
            .orElseThrow(() -> new TutorNotFoundException("Tutor Not Found"));
        Tutor tutor = mapper.toEntity(dto);
        existingTutor.setName(tutor.getName());
        existingTutor.setSubject(tutor.getSubject());
        existingTutor.setPhoneNumber(tutor.getPhoneNumber());
        existingTutor.setStatus(tutor.getStatus());

        User existingUser = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        existingTutor.setUser(existingUser);
        existingUser.setTutor(existingTutor);

        Tutor saved = tutorRepo.save(existingTutor);
        return mapper.toResponseDTO(saved);
}

    public String deleteTutor(Long id){

    Tutor tutor = tutorRepo.findById(id)
            .orElseThrow(() -> new TutorNotFoundException("Tutor Not Found"));

    User user = tutor.getUser();

    if(user != null){
        user.setTutor(null);
        tutor.setUser(null);
        userRepo.save(user);
    }

    tutorRepo.delete(tutor);

    return "Tutor deleted successfully";
}

    public TutorResponseDTO getTutor(Long id) {
        Tutor get = tutorRepo.findById(id).orElseThrow(()-> new TutorNotFoundException("Tutor Not Found"));
        return mapper.toResponseDTO(get);
    }
    public TutorResponseDTO getTutorByUserId(Long userId) {

    Tutor tutor = tutorRepo.findByUserId(userId)
            .orElseThrow(() -> new TutorNotFoundException("Tutor Not Found"));

    return mapper.toResponseDTO(tutor);
}
}
