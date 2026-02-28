package com.examly.springapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.service.OtpService;
import com.examly.springapp.service.SmsService;

@RestController
@RequestMapping("/api/otp")
public class OtpController {
    
    private final OtpService otpService;
    
    private final SmsService smsService;

    
        @Autowired
        public OtpController(OtpService otpService, SmsService smsService) {
            this.otpService = otpService;
            this.smsService = smsService;
        }

    

    


    @PostMapping("/send/sms")
    public ResponseEntity<Map<String, String>> sendOtpSms(@RequestParam String phone) {
        String otp = otpService.generateOtp(phone);
        smsService.sendOtp(phone, otp);

        Map<String, String> response = new HashMap<>();
        response.put("message", "OTP sent to your phone. Please check your phone.");

        return ResponseEntity.ok(response);
    }



    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String key, @RequestParam String otp) {
        return otpService.validateOtp(key, otp) ? "OTP Verified Successfully" : "Invalid OTP";
    }


    

}
