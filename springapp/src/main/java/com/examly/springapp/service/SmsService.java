package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

@Service
public class SmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    public void sendOtp(String phoneNumber, String otp) {
        Twilio.init(accountSid, authToken);
        String phone = "+91"+phoneNumber;
        
        Message.creator(
                new com.twilio.type.PhoneNumber(phone),
                new com.twilio.type.PhoneNumber(twilioPhoneNumber),
                "Your OTP code is Generated successfully."+otp
        ).create();
    }
}
