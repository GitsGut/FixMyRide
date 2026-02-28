package com.examly.springapp.controller;


import com.examly.springapp.dto.VehicleDto;
import com.examly.springapp.service.VehicleDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleDetailsServiceImpl vehicleDetailsServiceImpl;

    @Autowired
    public VehicleController(VehicleDetailsServiceImpl vehicleDetailsServiceImpl) {
        this.vehicleDetailsServiceImpl = vehicleDetailsServiceImpl;
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER','SUPER_ADMIN')")
    @PostMapping
    public VehicleDto createVehicle(@RequestBody VehicleDto vehicleDto) {
        return vehicleDetailsServiceImpl.createVehicle(vehicleDto);
    }

    
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public VehicleDto updateVehicle(@PathVariable Integer id, @RequestBody VehicleDto vehicleDto) {
        return vehicleDetailsServiceImpl.updateVehicle(id, vehicleDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER','SUPER_ADMIN')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public VehicleDto getVehicleById(@PathVariable Integer id) {
        return vehicleDetailsServiceImpl.getVehicleById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER','SUPER_ADMIN')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<VehicleDto> getAllVehicles() {
        return vehicleDetailsServiceImpl.getAllVehicles();
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER','SUPER_ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteVehicle(@PathVariable Integer id) {
        vehicleDetailsServiceImpl.deleteVehicle(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER','SUPER_ADMIN')")
    @GetMapping("/brand/{brandName}")
    @ResponseStatus(HttpStatus.OK)
    public List<VehicleDto> searchByBrand(@PathVariable String brandName) {
        return vehicleDetailsServiceImpl.searchByBrandName(brandName);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER','SUPER_ADMIN')")
    @GetMapping("/type/{vehicleType}")
    @ResponseStatus(HttpStatus.OK)
    public List<VehicleDto> filterByType(@PathVariable String vehicleType) {
        return vehicleDetailsServiceImpl.filterByVehicleType(vehicleType);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER','SUPER_ADMIN')")
    @GetMapping("/fuel/{fuelType}")
    @ResponseStatus(HttpStatus.OK)
    public List<VehicleDto> filterByFuel(@PathVariable String fuelType) {
        return vehicleDetailsServiceImpl.filterByFuelType(fuelType);
    }
}



