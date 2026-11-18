package com.example.Tutor_Application_System.exception;

public class DocumentNotFoundException extends RuntimeException{
    
    public DocumentNotFoundException(String msg){
        super(msg);
    }
}
