package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.RazorpayPaymentDto;

public interface RazorpayPaymentService {


    RazorpayPaymentDto createPayment(RazorpayPaymentDto dto);

    RazorpayPaymentDto getPaymentById(Long id);

    List<RazorpayPaymentDto> getAllPayments();

    RazorpayPaymentDto updatePayment(Long id, RazorpayPaymentDto dto);

    void deletePayment(Long id);

    RazorpayPaymentDto getPaymentByAppointmentId(Long appointmentId);
     RazorpayPaymentDto createCashPayment(RazorpayPaymentDto dto);


}
