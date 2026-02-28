package com.examly.springapp.exception;

public class ServiceAlreadyExistException extends RuntimeException{
    public ServiceAlreadyExistException(String message){
        super(message);
    }
}
