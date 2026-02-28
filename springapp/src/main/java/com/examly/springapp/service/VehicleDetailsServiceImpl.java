package com.examly.springapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.VehicleDto;
import com.examly.springapp.exception.EntityNotFoundException;
import com.examly.springapp.model.Vehicle;
import com.examly.springapp.repository.VehicleRepo;


@Service
public class VehicleDetailsServiceImpl implements VehicleDetailsService{

    
    private final VehicleRepo vehicleRepo;

    @Autowired
    public VehicleDetailsServiceImpl(VehicleRepo vehicleRepo)
    {
        this.vehicleRepo = vehicleRepo;
    }

    @Override
    public VehicleDto createVehicle(VehicleDto vehicleDto) {
        Vehicle vehicle = VehicleDto.toEntity(vehicleDto);
        return VehicleDto.fromEntity(vehicleRepo.save(vehicle));
    }

    @Override
    public VehicleDto updateVehicle(Integer id, VehicleDto vehicleDto) {
        Vehicle existing = vehicleRepo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Vehicle with ID:"+id+"not found to update"));

        existing.setVehicleType(vehicleDto.vehicleType());
        existing.setBrandName(vehicleDto.brandName());
        existing.setModelName(vehicleDto.modelName());
        existing.setFuelType(vehicleDto.fuelType());

        return VehicleDto.fromEntity(vehicleRepo.save(existing));
    }

    @Override
    public VehicleDto getVehicleById(Integer id) {
        Vehicle vehicle = vehicleRepo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Vehicle with ID:"+id+"not available"));
        return VehicleDto.fromEntity(vehicle);
    }

    @Override
    public List<VehicleDto> getAllVehicles() {
        return vehicleRepo.findAll()
            .stream()
            .map(VehicleDto::fromEntity)
            .collect(Collectors.toList());
    }

    @Override
    public void deleteVehicle(Integer id) {
        if (!vehicleRepo.existsById(id)) {
            throw new EntityNotFoundException("Cannot:Delete Vehicle with ID:"+id);
        }
        vehicleRepo.deleteById(id);
    }

    @Override
    public List<VehicleDto> searchByBrandName(String brandName) {
        return vehicleRepo.findByBrandName(brandName)
            .stream()
            .map(VehicleDto::fromEntity)
            .collect(Collectors.toList());
    }

    @Override
    public List<VehicleDto> filterByVehicleType(String vehicleType) {
        return vehicleRepo.findByVehicleType(vehicleType)
            .stream()
            .map(VehicleDto::fromEntity)
            .collect(Collectors.toList());
    }

    @Override
    public List<VehicleDto> filterByFuelType(String fuelType) {
        return vehicleRepo.findByFuelType(fuelType)
            .stream()
            .map(VehicleDto::fromEntity)
            .collect(Collectors.toList());
    }


}
