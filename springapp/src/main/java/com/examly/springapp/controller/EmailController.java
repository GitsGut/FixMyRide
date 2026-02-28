package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.examly.springapp.service.EmailService;
import com.examly.springapp.service.OtpService;

@RestController
@RequestMapping("/api/user")
public class EmailController {

    @Autowired
    private EmailService emailService;
 
    @Autowired
    private OtpService otpService;
    
    
    @PostMapping("/send/email")
    public ResponseEntity<Map<String, String>> sendOtpEmail(@RequestParam String email) {
        String otp = otpService.generateOtp(email);
        String decodedEmail = URLDecoder.decode(email, StandardCharsets.UTF_8);
        emailService.sendOtp(decodedEmail, otp);
        Map<String, String> response = new HashMap<>();
        response.put("message", "OTP sent successfully to your email: " + decodedEmail);
        return ResponseEntity.ok(response);
    }
 
    @PostMapping("/verify/email")
    public String verifyOtp(@RequestParam String email, @RequestParam String otp) {
        return otpService.validateOtp(email, otp) ? "OTP Verified Successfully" : "Invalid OTP";
    }

}
