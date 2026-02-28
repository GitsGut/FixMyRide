package com.examly.springapp.dto;

import com.examly.springapp.model.VehicleMaintenance;

public record VehicleMaintenanceDto(
    Long serviceId,
    String serviceName,
    int servicePrice,
    String typeOfVehicle,
    String duration,
    String category,
    String status,
    String shortDescription,
    String longDescription
) {
    public static VehicleMaintenance toEntity(VehicleMaintenanceDto dto) {
        VehicleMaintenance.VehicleMaintenanceBuilder builder =
            VehicleMaintenance.builder()
                .serviceName(dto.serviceName())
                .servicePrice(dto.servicePrice())
                .typeOfVehicle(dto.typeOfVehicle())
                .duration(dto.duration())
                .category(dto.category())
                .status(dto.status())
                .shortDescription(dto.shortDescription())
                .longDescription(dto.longDescription());

        if (dto.serviceId() != null) {
            builder.serviceId(dto.serviceId());
        }

        return builder.build();
    }

    public static VehicleMaintenanceDto fromEntity(VehicleMaintenance entity) {
        return new VehicleMaintenanceDto(
            entity.getServiceId(),
            entity.getServiceName(),
            entity.getServicePrice(),
            entity.getTypeOfVehicle(),
            entity.getDuration(),
            entity.getCategory(),
            entity.getStatus(),
            entity.getShortDescription(),
            entity.getLongDescription()
        );
    }
}
