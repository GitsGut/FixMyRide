package com.examly.springapp.exception;

public class AdminNotApprovedException extends RuntimeException {

   public AdminNotApprovedException(String message)
     {
        super(message);
     }
}
