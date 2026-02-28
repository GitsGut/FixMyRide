package com.examly.springapp.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.VehicleMaintenanceDto;
import com.examly.springapp.service.VehicleServiceImpl;

@RestController
@RequestMapping("/api/services")
public class VehicleServiceController {
    private final VehicleServiceImpl vehicleServiceImpl;
    @Autowired
    public VehicleServiceController(VehicleServiceImpl vehicleServiceImpl)
    {
        this.vehicleServiceImpl=vehicleServiceImpl;
    }
   
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VehicleMaintenanceDto addService(@RequestBody VehicleMaintenanceDto vehicleMaintenanceDto)
    {
        return vehicleServiceImpl.addService(vehicleMaintenanceDto);
    }
    
    @PreAuthorize("hasAnyRole('ADMIN','USER','SUPER_ADMIN')")
    @GetMapping("/service")
    @ResponseStatus(HttpStatus.OK)
    public List<VehicleMaintenanceDto> viewServiceByName(@RequestParam String serviceName)
    {
        return vehicleServiceImpl.findByServiceName(serviceName);
    }
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public VehicleMaintenanceDto updateServiceById(@PathVariable Long id,@RequestBody VehicleMaintenanceDto vehicleMaintenanceDto)
    {
        return vehicleServiceImpl.updateService(id, vehicleMaintenanceDto);
    }
    

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','USER')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<VehicleMaintenanceDto> viewAllServices()
    {
        return vehicleServiceImpl.getAllServices();
    }
   

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','USER')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<VehicleMaintenanceDto> viewServiceById(@PathVariable Long id)
    {
        return vehicleServiceImpl.getServiceById(id);
    }
 

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteService(@PathVariable Long id)
    {
        vehicleServiceImpl.deleteService(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @PutMapping("/{id}/status")
    @ResponseStatus(HttpStatus.OK)
    public void updateServiceStatus(@PathVariable Long id, @RequestParam String status) { 
        vehicleServiceImpl.updateStatus(id, status);
    }


}
