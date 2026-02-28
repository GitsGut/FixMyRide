package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;


import com.examly.springapp.dto.VehicleMaintenanceDto;



public interface VehicleService {
    public VehicleMaintenanceDto addService(VehicleMaintenanceDto serviceDto);
    public VehicleMaintenanceDto updateService(Long serviceId,VehicleMaintenanceDto serviceDto);
    public void deleteService(Long serviceId);
    public List<VehicleMaintenanceDto> getAllServices();
    public Optional<VehicleMaintenanceDto> getServiceById(Long serviceId);
    public List<VehicleMaintenanceDto> findByServiceName(String serviceName);
    public void updateStatus(Long serviceId, String status);

   
    
}
