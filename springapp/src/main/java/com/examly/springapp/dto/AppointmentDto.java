package com.examly.springapp.dto;

import java.time.LocalDate;

import com.examly.springapp.model.Address;
import com.examly.springapp.model.Appointment;

public record AppointmentDto(
    Long appointmentId,
    VehicleMaintenanceDto service,
    LocalDate appointmentDate,
    String status,
    UserDto user,
    String slot,
    VehicleDto vehicle,
    Address address,
    String paymentType
) {
    
    public static Appointment toEntity(AppointmentDto dto) {
        if (dto == null) return null;

        Appointment.AppointmentBuilder builder = Appointment.builder()
            .appointmentDate(dto.appointmentDate())
            .slot(dto.slot())
            .status(dto.status())
            .address(dto.address())
            .paymentType(dto.paymentType());

        if (dto.appointmentId() != null) {
            builder.appointmentId(dto.appointmentId());
        }

        if (dto.service() != null) {
            builder.service(VehicleMaintenanceDto.toEntity(dto.service()));
        }

        if (dto.user() != null) {
            builder.user(UserDto.toEntity(dto.user()));
        }

        if (dto.vehicle() != null) {
            builder.vehicle(VehicleDto.toEntity(dto.vehicle()));
        }

        return builder.build();
    }

    public static AppointmentDto fromEntity(Appointment entity) {
        if (entity == null) return null;

        return new AppointmentDto(
            entity.getAppointmentId(),
            VehicleMaintenanceDto.fromEntity(entity.getService()),
            entity.getAppointmentDate(),
            entity.getStatus(),
            UserDto.fromEntity(entity.getUser()),
            entity.getSlot(),
            VehicleDto.fromEntity(entity.getVehicle()),
            entity.getAddress(),
            entity.getPaymentType()
        );
    }
}
