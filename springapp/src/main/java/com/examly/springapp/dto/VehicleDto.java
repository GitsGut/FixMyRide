package com.examly.springapp.dto;

import com.examly.springapp.model.Vehicle;

public record VehicleDto(
    Integer vehicleId,
    String vehicleType,
    String brandName,
    String modelName,
    String fuelType
) {
    public static Vehicle toEntity(VehicleDto dto) {
        Vehicle.VehicleBuilder builder = Vehicle.builder()
            .vehicleType(dto.vehicleType())
            .brandName(dto.brandName())
            .modelName(dto.modelName())
            .fuelType(dto.fuelType());

        if (dto.vehicleId() != null) {
            builder.vehicleId(dto.vehicleId());
        }

        return builder.build();
    }

    public static VehicleDto fromEntity(Vehicle entity) {
        return new VehicleDto(
            entity.getVehicleId(),
            entity.getVehicleType(),
            entity.getBrandName(),
            entity.getModelName(),
            entity.getFuelType()
        );
    }
}