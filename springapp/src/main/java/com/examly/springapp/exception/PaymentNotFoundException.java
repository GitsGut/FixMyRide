package com.examly.springapp.exception;

public class PaymentNotFoundException extends RuntimeException{
    public PaymentNotFoundException(String message){
        super(message);
    }
}
