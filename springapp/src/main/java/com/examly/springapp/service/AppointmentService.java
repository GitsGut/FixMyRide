package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.AppointmentDto;
import com.examly.springapp.model.Address;

public interface AppointmentService {
    AppointmentDto addAppointment(AppointmentDto appointmentDto);

    AppointmentDto updateAppointment(Long appointmentId, AppointmentDto appointmentDto);

    void deleteAppointment(Long appointmentId);

    List<AppointmentDto> getAllAppointments();

    AppointmentDto getAppointmentById(Long appointmentId);

    List<AppointmentDto> getAppointmentsByUserId(int userId);

    Address addAddress(Address address);
    boolean hasPendingAppointments(Long serviceId);
}