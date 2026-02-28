package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.VehicleDto;

public interface VehicleDetailsService {

    VehicleDto createVehicle(VehicleDto vehicleDto);
    VehicleDto updateVehicle(Integer id, VehicleDto vehicleDto);
    VehicleDto getVehicleById(Integer id);
    List<VehicleDto> getAllVehicles();
    void deleteVehicle(Integer id);
    List<VehicleDto> searchByBrandName(String brandName);
    List<VehicleDto> filterByVehicleType(String vehicleType);
    List<VehicleDto> filterByFuelType(String fuelType);

}
