package com.example.Tutor_Application_System.exception;

public class UserNotFoundException extends RuntimeException{
    
    public UserNotFoundException(String msg){
        super(msg);
    }
}
