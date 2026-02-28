import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { VehicleService } from 'src/app/services/vehicle.service';
 
@Component({
  selector: 'app-adminviewservice',
  templateUrl: './adminviewservice.component.html',
  styleUrls: ['./adminviewservice.component.css']
})
export class AdminviewserviceComponent implements OnInit {
 
  services: any[] = [];
  filteredServices: any[] = [];
  searchTerm: string = '';
  selectedType: string = '';
  selectedService: any = null;
  errorMessage: string = '';
  isError: boolean = false;
 
  currentPage: number = 1;
  itemsPerPage: number = 5;
 
  constructor(private serviceApi: VehicleService, private router: Router, private errorService: ErrorService) {}
 
  ngOnInit(): void {
    this.fetchServices();
  }
 
  fetchServices(): void {
    this.serviceApi.getAllServices().subscribe({
      next: (data) => {
        this.services = data;
        this.filteredServices = [...this.services];
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = typeof err.error === 'string'
          ? err.error
          : err.error?.message || 'Unexpected error occurred';
        this.isError = true;
      }
    });
  }
 
  searchService(): void {
    const term = this.searchTerm.trim().toLowerCase();
    const type = this.selectedType.toLowerCase();
 
    this.filteredServices = this.services.filter(service =>
      service.serviceName.toLowerCase().includes(term) &&
      (type ? service.status.toLowerCase() === type : true)
    );
 
    this.currentPage = 1;
  }
 
  filterByType(): void {
    const type = this.selectedType.toLowerCase();
 
    this.filteredServices = this.services.filter(service =>
      type ? service.status.toLowerCase() === type : true
    );
 
    this.currentPage = 1;
  }
 
  getPaginatedServices(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredServices.slice(startIndex, endIndex);
  }
 
  viewServiceDetails(service: any): void {
    this.selectedService = service;
  }
 
  closePopup(): void {
    this.selectedService = null;
  }
 
  editService(): void {
    this.router.navigate(['/admin/services', this.selectedService.serviceId]);
  }
 
  toggleServiceStatus(service: any): void {
    this.serviceApi.checkPendingAppointments(service.serviceId).subscribe({
      next: (hasPending: boolean) => {
        if (hasPending) {
          this.errorService.showError('This service has an appointment pending');
          this.isError = true;
        } else {
          const newStatus = service.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
          this.serviceApi.updateServiceStatus(service.serviceId, newStatus).subscribe({
            next: () => {
              service.status = newStatus;
              this.isError = false;
            },
            error: () => {
              this.errorService.showError('Failed to update service status');
              this.isError = true;
            }
          });
        }
      },
      error: () => {
        this.errorService.showError('Error checking appointment status');
        this.isError = true;
      }
    });
  }
}
 