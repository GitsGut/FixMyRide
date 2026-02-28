package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is: " + otp);
        mailSender.send(message);
    }
    @Value("${spring.mail.username}")
    private String fromEmail;
 
    public void sendOtpEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Your Email Verification OTP");
            message.setText("Your OTP code is: " + otp +
                    "\n\nPlease do not share this code with anyone.\n\n" +
                    "This OTP will expire in 5 minutes.");
 
            mailSender.send(message);
           
            System.out.println("OTP email sent successfully to: " + toEmail);
 
        } catch (MailAuthenticationException e) {
            System.err.println("Authentication failed! Check your email credentials or app password.");
        
            throw new RuntimeException("Email authentication failed. Please verify credentials in application.properties.");
 
        } catch (MailSendException e) {
            System.err.println("Mail sending failed! The recipient address might be invalid or your network may be blocking SMTP.");
         
            throw new RuntimeException("Failed to send email. Check recipient address or internet connection.");
 
        } catch (org.springframework.mail.MailException e) {
            System.err.println("Messaging exception occurred while constructing or sending the email.");
   
            throw new RuntimeException("Internal messaging error. Please try again later.");
 
        } catch (Exception e) {
            System.err.println("Unexpected error occurred while sending email to: " + toEmail);
            
            throw new RuntimeException("Unexpected email sending error.");
        }
    } 
}
