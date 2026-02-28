package com.examly.springapp.exception;

public class MobileNumberAlreadyExistException extends RuntimeException{
    public MobileNumberAlreadyExistException(String message){
        super(message);
    }
}
