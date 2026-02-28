package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.examly.springapp.model.RazorpayPayment;

public interface RazorpayPaymentRepo extends JpaRepository<RazorpayPayment,Long> {

 @Query("select p from RazorpayPayment p where p.appointment.id = :appointmentId")
 Optional<RazorpayPayment> findByAppointmentId( Long appointmentId);

}
