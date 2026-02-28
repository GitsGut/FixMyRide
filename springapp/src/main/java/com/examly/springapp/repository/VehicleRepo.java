package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.examly.springapp.model.Vehicle;

public interface VehicleRepo extends JpaRepository<Vehicle,Integer> {

    @Query("SELECT v FROM Vehicle v WHERE v.brandName = :brandName")
    List<Vehicle> findByBrandName(String brandName);

    @Query("SELECT v FROM Vehicle v WHERE v.vehicleType = :vehicleType")
    List<Vehicle> findByVehicleType(String vehicleType);

    @Query("SELECT v FROM Vehicle v WHERE v.fuelType = :fuelType")
    List<Vehicle> findByFuelType(String fuelType);


}
