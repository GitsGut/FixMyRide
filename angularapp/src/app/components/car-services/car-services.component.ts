import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleMaintenance } from 'src/app/models/vehicle-maintenance.model';
import { VehicleDetailsService } from 'src/app/services/vehicle-details.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-car-services',
  templateUrl: './car-services.component.html',
  styleUrls: ['./car-services.component.css']
})
export class CarServicesComponent implements OnInit {

  categories = [
    { name: 'Car Services' },
    { name: 'Car AC Service' },
    { name: 'Car Tyre' },
    { name: 'Car Premium Service' },
    { name: 'Car Painting' },
    { name: 'Car Detailing' }

  ];

  selectedCategory: string = 'Car Services';
  allServices: VehicleMaintenance[] = [];
  filteredServices: VehicleMaintenance[] = [];
  errorMessage: string = '';
  isError: boolean = false;
  vehicleId: number | null = null;

  constructor(
    private vehicleService: VehicleService,
    private vehicleDetailsService: VehicleDetailsService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.vehicleId = +this.activateRoute.snapshot.params['vId'];
    this.loadAllCarServices();
  }

  loadAllCarServices(): void {
    this.vehicleService.getAllServices().subscribe({
      next: (data) => {
        this.allServices = data.filter(service => service.typeOfVehicle === 'Car');
        this.filteredServices = [...this.allServices];
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = typeof err.error === 'string'
          ? err.error
          : err.error.message || 'Unexpected error occurred';
        this.isError = true;
      }
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;

    if (category === 'Car Services') {
      this.filteredServices = [...this.allServices];
    } else {
      this.filteredServices = this.allServices.filter(
        service => service.category.toLowerCase() === category.toLowerCase()
      );
    }
  }

  viewDetails(serviceId: number): void {
    this.router.navigate(['/user/service-details', serviceId,this.vehicleId]);
  }

  bookAppointment(serviceId: number): void {
    if (this.vehicleId !== null) {
      this.router.navigate(['/user/appointments', serviceId, this.vehicleId]);
    } else {
      this.errorMessage = 'Vehicle not selected. Please go back and select a vehicle.';
      this.isError = true;
    }
  }
}