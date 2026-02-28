package com.examly.springapp.exception;

public class ServiceNotFoundException extends RuntimeException{
    public ServiceNotFoundException(String message){
        super(message);
    }
}
