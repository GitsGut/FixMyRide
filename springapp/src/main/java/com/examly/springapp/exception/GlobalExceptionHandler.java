package com.examly.springapp.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(EmailAlreadyExistException.class)
    public ResponseEntity<String> handleEmailExist(EmailAlreadyExistException e){
        return ResponseEntity.status(409).body(e.getMessage());
    }
    @ExceptionHandler(FeedbackNotFoundException.class)
    public ResponseEntity<String> handleFeedbackNotFound(FeedbackNotFoundException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }
    @ExceptionHandler(MobileNumberAlreadyExistException.class)
    public ResponseEntity<String> handleMobileNumberExist(MobileNumberAlreadyExistException e){
        return ResponseEntity.status(409).body(e.getMessage());
    }
    @ExceptionHandler(ServiceAlreadyExistException.class)
    public ResponseEntity<String> handleServiceAlreadyExist(ServiceAlreadyExistException e){
        return ResponseEntity.status(409).body(e.getMessage());
    }
    @ExceptionHandler(UsernameAlreadyExistException.class)
    public ResponseEntity<String> handleUsernameAlreadyExist(UsernameAlreadyExistException e){
        return ResponseEntity.status(409).body(e.getMessage());
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFound(UserNotFoundException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }
    @ExceptionHandler(AppointmentAlreadyExistException.class)
    public ResponseEntity<String> handleAppointmentAlreadyExist(AppointmentAlreadyExistException e){
        return ResponseEntity.status(409).body(e.getMessage());
    }
    @ExceptionHandler(AppointmentNotFoundException.class)
    public ResponseEntity<String> handleAppointmentNotFound(AppointmentNotFoundException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }
    @ExceptionHandler(ServiceNotFoundException.class)
    public ResponseEntity<String> handleServiceNotFound(ServiceNotFoundException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(AdminNotApprovedException.class)
    public ResponseEntity<String> handleAdminNotApprovedException(AdminNotApprovedException e){
        return ResponseEntity.status(403).body(e.getMessage());
    }
    
    @ExceptionHandler(PaymentNotFoundException.class)
    public ResponseEntity<String> handlePaymentNotFoundException(PaymentNotFoundException e){
        return ResponseEntity.status(403).body(e.getMessage());
    }

    @ExceptionHandler(InvalidUpdateException.class)
    public ResponseEntity<String> handleInvalidUpdateException(InvalidUpdateException e){
        return ResponseEntity.status(403).body(e.getMessage());
    }

}
