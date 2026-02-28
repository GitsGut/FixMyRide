import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleMaintenance } from 'src/app/models/vehicle-maintenance.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-adminaddservice',
  templateUrl: './adminaddservice.component.html',
  styleUrls: ['./adminaddservice.component.css']
})
export class AdminaddserviceComponent implements OnInit {
  
  vehicle: VehicleMaintenance = {
    serviceName: '',
    servicePrice: 0,
    typeOfVehicle: '',
    duration: '',
    category: '',
    status: '',
    shortDescription:'',
    longDescription:''
  };

  isEditing: boolean = false;
  serviceId: number = 0;
  errorMessage: string = '';
  isError : boolean = false ;
  currentStep:number=1;
  showSuccessPopup: boolean = false;
  successMessage: string = ''; 

  vehicleTypes: string[] = ['Car', 'Bike'];
  categories: string[] = [];

  carCategories: string[] = [
    'Car AC Service',
    'Car Tyre',
    'Car Premium Service',
    'Car Painting',
    'Car Detailing'
  ];

  bikeCategories: string[] = [
    'Bike Engine Service',
    'Bike Tyre',
    'Bike Premium Service',
    'Bike Painting',
    'Bike Detailing'
  ];

  constructor(
    private router: Router,
    private service: VehicleService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = +this.activateRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.serviceId = idParam;
      this.isEditing = true;
      this.service.getServiceById(this.serviceId).subscribe({
        next: (data) => {
          this.vehicle = data;
          this.setCategories(data.typeOfVehicle); 
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = typeof err.error === 'string'
            ? err.error
            : err.error.message || 'Unexpected error occurred';
          this.isError = true;
        }
      });
    }
  }

  setCategories(type: string): void {
    if (type === 'Car') {
      this.categories = this.carCategories;
    } else if (type === 'Bike') {
      this.categories = this.bikeCategories;
    } else {
      this.categories = [];
    }
  }

  onVehicleTypeChange(): void {
    this.setCategories(this.vehicle.typeOfVehicle);
    this.vehicle.category = ''; 
  }

  addOrUpdateService(form: NgForm): void {
    if (form.valid) {
      if (this.isEditing) {
        this.service.updateService(this.serviceId, this.vehicle).subscribe({
          next: () => {
            this.successMessage = 'Service updated successfully!';
            this.showSuccessPopup = true;

          },
          error: (err: HttpErrorResponse) => {
            this.errorMessage = typeof err.error === 'string'
              ? err.error
              : err.error.message || 'Unexpected error occurred';
            this.isError = true;
          }
        });
        
      } 
      else {
        
            this.service.addService(this.vehicle).subscribe({
              next: (res) => {
                this.successMessage = 'Service added successfully!';
                this.showSuccessPopup = true;

              },
              error: (err: HttpErrorResponse) => {
                this.errorMessage = typeof err.error === 'string'
                  ? err.error
                  : err.error.message || 'Unexpected error occurred';
                this.isError = true;
              }
            });

      }
    }
  }
  cancelEdit(): void {
    this.isEditing = false;
    this.router.navigate(['/admin/services/view']);
  }
  closePopup(): void {
    this.showSuccessPopup = false;
    this.router.navigate(['/admin/services/view']);  

  }
}
