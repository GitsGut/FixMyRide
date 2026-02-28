package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.Appointment;

public interface AppointmentRepo extends JpaRepository<Appointment,Long>{

    @Query("SELECT a FROM Appointment a WHERE a.user.userId = :userId")
    public List<Appointment> findByUserId(int userId); 

    
    @Query("SELECT a FROM Appointment a WHERE a.service.serviceId = :serviceId")
    List<Appointment> findByServiceId(Long serviceId);

}
