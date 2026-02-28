package com.examly.springapp.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.AppointmentDto;
import com.examly.springapp.exception.InvalidUpdateException;
import com.examly.springapp.model.Address;
import com.examly.springapp.model.Appointment;
import com.examly.springapp.repository.AddressRepo;
import com.examly.springapp.repository.AppointmentRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepo appointmentRepo;
    private final AddressRepo addressRepo;

    @Autowired
    public AppointmentServiceImpl(AppointmentRepo appointmentRepo, AddressRepo addressRepo) {
        this.appointmentRepo = appointmentRepo;
        this.addressRepo = addressRepo;
    }

    @Override
    public Address addAddress(Address address){
        if(address != null){
            return addressRepo.save(address);
        }
        throw new IllegalArgumentException("Address Should not be null");
    }
    

    @Override
    public AppointmentDto addAppointment(AppointmentDto appointmentDto ) {
        Appointment savedAppointment  = appointmentRepo.save(AppointmentDto.toEntity(appointmentDto));
        return AppointmentDto.fromEntity(savedAppointment);
    }

    @Override
    public AppointmentDto updateAppointment(Long appointmentId, AppointmentDto appointmentDto) {
        if (!appointmentRepo.existsById(appointmentId)) {
            throw new EntityNotFoundException("Update failed: No appointment found with ID " + appointmentId);
        }
        LocalDate today = LocalDate.of(2025, 10, 14);

        if(today.isAfter(appointmentDto.appointmentDate()) )
        {
          if(appointmentDto.status().equals("Completed") || appointmentDto.status().equals("In-Progress"))
          {
            throw new InvalidUpdateException("Cant Update the field of future as "+appointmentDto.status());
          }
        } 
        Appointment updated = AppointmentDto.toEntity(
            new AppointmentDto(
                appointmentId,
                appointmentDto.service(),
                appointmentDto.appointmentDate(),
                appointmentDto.status(),
                appointmentDto.user(),
                appointmentDto.slot(),
                appointmentDto.vehicle(),
                appointmentDto.address(),
                appointmentDto.paymentType()
            )
        );
        Appointment saved = appointmentRepo.save(updated);
        return AppointmentDto.fromEntity(saved);
    }

    @Override
    public void deleteAppointment(Long appointmentId) {
        if (!appointmentRepo.existsById(appointmentId)) {
            throw new EntityNotFoundException("Cannot delete: No appointment found with ID " + appointmentId);
        }
        appointmentRepo.deleteById(appointmentId);
    }

    @Override
    public List<AppointmentDto> getAllAppointments() {
        List<Appointment> list = appointmentRepo.findAll();
        if (list.isEmpty()) {
            throw new EntityNotFoundException("No appointments are currently available.");
        }
        return list.stream().map(AppointmentDto::fromEntity).toList();
    }

    @Override
    public AppointmentDto getAppointmentById(Long appointmentId) {
        Appointment entity = appointmentRepo.findById(appointmentId).orElse(null);
    
        if (entity == null) {
            throw new EntityNotFoundException("No appointment found with ID " + appointmentId);
        }
    
        return AppointmentDto.fromEntity(entity);
    }

    @Override
    public List<AppointmentDto> getAppointmentsByUserId(int userId) {
        List<Appointment> list = appointmentRepo.findByUserId(userId);
        if (list.isEmpty()) {
            throw new EntityNotFoundException("No appointments found for user ID '" + userId + "'");
        }
        return list.stream().map(AppointmentDto::fromEntity).toList();
    }
    @Override
    public boolean hasPendingAppointments(Long serviceId) {
        List<Appointment> appointments = appointmentRepo.findByServiceId(serviceId);
        return appointments.stream().anyMatch(a -> !"COMPLETED".equalsIgnoreCase(a.getStatus()));
    }
}