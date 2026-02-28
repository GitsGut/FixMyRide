package com.examly.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.examly.springapp.model.VehicleMaintenance;

public interface VehicleServiceRepo extends JpaRepository<VehicleMaintenance,Long>
{
    @Query("SELECT v FROM VehicleMaintenance v where v.serviceName LIKE :serviceName AND v.typeOfVehicle LIKE :typeOfVehicle")
    public Optional<VehicleMaintenance> findByServiceNameandTypeOfVehicle(String serviceName,String typeOfVehicle);

    @Query("SELECT v FROM VehicleMaintenance v where v.serviceName LIKE :serviceName ")
    public List<VehicleMaintenance> findByServiceName(String serviceName);

    

}
