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

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Vehicle {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
int  vehicleId ;
String vehicleType ;
String brandName ;
String modelName ;
String fuelType ;
}
