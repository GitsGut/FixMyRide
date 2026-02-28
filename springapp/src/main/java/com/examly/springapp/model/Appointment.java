package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long appointmentId;

    @ManyToOne
    @JoinColumn(name = "serviceId")
    private VehicleMaintenance service;

    private LocalDate appointmentDate;
    @Builder.Default
    private String status = "Pending";

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;
     
    private String slot ;

    @OneToOne
    @JoinColumn(name="vehicleId")
    private Vehicle vehicle ;

    @OneToOne
    @JoinColumn(name = "addressId")
    private Address address;

    private String paymentType;
}



