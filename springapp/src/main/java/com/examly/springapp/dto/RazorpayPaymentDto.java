package com.examly.springapp.dto;

import java.time.LocalDateTime;

import com.examly.springapp.model.RazorpayPayment;

public record RazorpayPaymentDto(
    Long id,
    String paymentId,
    String orderId,
    String signature,
    String currency,
    String status,
    Long amount,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    AppointmentDto appointment
) { 

    public static RazorpayPayment toEntity(RazorpayPaymentDto dto) {
        if (dto == null) return null;

        RazorpayPayment entity = new RazorpayPayment();
        entity.setId(dto.id());
        entity.setPaymentId(dto.paymentId());
        entity.setOrderId(dto.orderId());
        entity.setSignature(dto.signature());
        entity.setCurrency(dto.currency());
        entity.setStatus(dto.status());
        entity.setAmount(dto.amount());
        entity.setCreatedAt(dto.createdAt());
        entity.setUpdatedAt(dto.updatedAt());

        if (dto.appointment() != null) {
            entity.setAppointment(AppointmentDto.toEntity(dto.appointment()));
        }

        return entity;
    }

    public static RazorpayPaymentDto fromEntity(RazorpayPayment entity) {
        if (entity == null) return null;

        return new RazorpayPaymentDto(
            entity.getId(),
            entity.getPaymentId(),
            entity.getOrderId(),
            entity.getSignature(),
            entity.getCurrency(),
            entity.getStatus(),
            entity.getAmount(),
            entity.getCreatedAt(),
            entity.getUpdatedAt(),
            AppointmentDto.fromEntity(entity.getAppointment())
        );
    }
}
