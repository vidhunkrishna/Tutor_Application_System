package com.example.Tutor_Application_System.exception;

public class ApplicationNotFoundException extends RuntimeException{
    
    public ApplicationNotFoundException(String msg){
        super(msg);
    }
}
