package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.VehicleMaintenanceDto;
import com.examly.springapp.exception.ServiceAlreadyExistException;
import com.examly.springapp.model.VehicleMaintenance;
import com.examly.springapp.repository.VehicleServiceRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleServiceRepo vehicleServiceRepo;

    @Autowired
    public VehicleServiceImpl(VehicleServiceRepo vehicleServiceRepo) {
        this.vehicleServiceRepo = vehicleServiceRepo;
    }

    @Override
    public VehicleMaintenanceDto addService(VehicleMaintenanceDto serviceDto) {
        vehicleServiceRepo.findByServiceNameandTypeOfVehicle(serviceDto.serviceName(), serviceDto.typeOfVehicle())
            .ifPresent(existing -> {
                throw new ServiceAlreadyExistException("A service with the name '" + serviceDto.serviceName()
                    + "' for vehicle type '" + serviceDto.typeOfVehicle() + "' already exists.");
            });

        VehicleMaintenance saved = vehicleServiceRepo.save(VehicleMaintenanceDto.toEntity(serviceDto));
        return VehicleMaintenanceDto.fromEntity(saved);
    }

    @Override
    public VehicleMaintenanceDto updateService(Long serviceId, VehicleMaintenanceDto serviceDto) {
        if (!vehicleServiceRepo.existsById(serviceId)) {
            throw new EntityNotFoundException("Update failed: No vehicle service found with ID " + serviceId + ". Please check the ID and try again.");
        }

        VehicleMaintenance updated = VehicleMaintenance.builder()
            .serviceId(serviceId)
            .serviceName(serviceDto.serviceName())
            .servicePrice(serviceDto.servicePrice())
            .typeOfVehicle(serviceDto.typeOfVehicle())
            .duration(serviceDto.duration())
            .category(serviceDto.category())
            .status(serviceDto.status())
            .shortDescription(serviceDto.shortDescription())
            .longDescription(serviceDto.longDescription())
            .build();

        VehicleMaintenance saved = vehicleServiceRepo.save(updated);
        return VehicleMaintenanceDto.fromEntity(saved);
    }

    @Override
    public void deleteService(Long serviceId) {
        if (!vehicleServiceRepo.existsById(serviceId)) {
            throw new EntityNotFoundException("Cannot delete: No service found with ID " + serviceId);
        }
        vehicleServiceRepo.deleteById(serviceId);
    }

    @Override
    public List<VehicleMaintenanceDto> getAllServices() {
        List<VehicleMaintenance> list = vehicleServiceRepo.findAll();
        if (list.isEmpty()) {
            throw new EntityNotFoundException("No vehicle maintenance services are currently available.");
        }
        return list.stream().map(VehicleMaintenanceDto::fromEntity).toList();
    }

    @Override
    public Optional<VehicleMaintenanceDto> getServiceById(Long serviceId) {
        Optional<VehicleMaintenance> opt = vehicleServiceRepo.findById(serviceId);
        if (opt.isEmpty()) {
            throw new EntityNotFoundException("No service found with ID " + serviceId);
        }
        return opt.map(VehicleMaintenanceDto::fromEntity);
    }

    @Override
    public List<VehicleMaintenanceDto> findByServiceName(String serviceName) {
        List<VehicleMaintenance> list = vehicleServiceRepo.findByServiceName(serviceName);
        if (list.isEmpty()) {
            throw new EntityNotFoundException("No services found with the name '" + serviceName + "'");
        }
        return list.stream().map(VehicleMaintenanceDto::fromEntity).toList();
    }
    
    @Override
    public void updateStatus(Long serviceId, String status) {
        VehicleMaintenance service = vehicleServiceRepo.findById(serviceId)
            .orElseThrow(() -> new EntityNotFoundException("No service found with ID " + serviceId));

        service.setStatus(status);
        vehicleServiceRepo.save(service);
    }
}