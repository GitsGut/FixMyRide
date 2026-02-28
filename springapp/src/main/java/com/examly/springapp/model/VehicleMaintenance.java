package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Builder
public class VehicleMaintenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long serviceId;
    private String serviceName;
    private int servicePrice;
    private String typeOfVehicle;
    private String duration ;
    private String category ;
    private String status ;
    private String shortDescription;
    private String longDescription;

}
