package com.examly.springapp.controller;

import com.examly.springapp.dto.RazorpayPaymentDto;
import com.examly.springapp.service.RazorpayPaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class RazorpayPaymentController {

    private final RazorpayPaymentService paymentService;

    @Autowired
    public RazorpayPaymentController(RazorpayPaymentService paymentService) {
        this.paymentService = paymentService;
    }
   
    @PreAuthorize("hasRole('USER')")
   @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayPaymentDto createPayment(@RequestBody RazorpayPaymentDto dto) {
        return paymentService.createPayment(dto);
    }
       
    @PreAuthorize("hasRole('USER')")
   @PostMapping("/createCash")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayPaymentDto createCashPayment(@RequestBody RazorpayPaymentDto dto) {
        return paymentService.createCashPayment(dto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','USER')")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public RazorpayPaymentDto updatePayment(@PathVariable Long id, @RequestBody RazorpayPaymentDto dto) {
        return paymentService.updatePayment(id, dto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<RazorpayPaymentDto> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public RazorpayPaymentDto getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','SUPER_ADMIN')")
    @GetMapping("/appointment/{appointmentId}")
    @ResponseStatus(HttpStatus.OK)
    public RazorpayPaymentDto getPaymentByAppointmentId(@PathVariable Long appointmentId) {
    return paymentService.getPaymentByAppointmentId(appointmentId);
}
}