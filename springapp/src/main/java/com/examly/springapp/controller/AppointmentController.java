package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.dto.AppointmentDto;
import com.examly.springapp.model.Address;
import com.examly.springapp.service.AppointmentService;


// @PreAuthorize("hasRole('USER')")
@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/address")
    @ResponseStatus(HttpStatus.CREATED)
    public Address addAddress(@RequestBody Address address){
        return appointmentService.addAddress(address);
    }
    
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentDto addAppointment(@RequestBody AppointmentDto appointmentDto) {
        return appointmentService.addAppointment(appointmentDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppointmentDto updateAppointment(@PathVariable Long id, @RequestBody AppointmentDto appointmentDto) {
        return appointmentService.updateAppointment(id, appointmentDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }
         
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<AppointmentDto> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER','SUPER_ADMIN')")
    @GetMapping("/base/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppointmentDto getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public List<AppointmentDto> getAppointmentsByUserId(@PathVariable int userId) {
        return appointmentService.getAppointmentsByUserId(userId);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @GetMapping("/services/{serviceId}/hasPending") 
    @ResponseStatus(HttpStatus.OK)
    public boolean hasPendingAppointments(@PathVariable Long serviceId) {    
        return appointmentService.hasPendingAppointments(serviceId);
    }

}