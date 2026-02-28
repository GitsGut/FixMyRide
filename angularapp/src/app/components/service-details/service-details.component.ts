import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleMaintenance } from 'src/app/models/vehicle-maintenance.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import { HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  serviceId: number = 0;
  service: VehicleMaintenance | null = null;
  feedbacks: Feedback[] = [];
  averageRating: number = 0;
  totalRatings: number = 0;
  ratingBreakdown: { label: string; count: number; percentage: number }[] = [];
  errorMessage: string = '';
  isError: boolean = false;
  vehicleId: number | null = null;
 
  // ✅ Image map for services
  imageMap: { [key: number]: string } = {
    1: 'AcServiceImage.jpg',
    2: 'bike-bg.jpg',
    3: 'bikeTyreRepairimage.jpg',
    4: 'brakeInspectionBike.jpg',
    5: 'carTyrerepair.jpg',
    6: 'coolantFlush.jpg',
    7: 'EngineRepairImage.jpg',
    8:'OilChange.jpg',
    9:'suspensionCar.jpg',
    10:'WheelAlignment.jpg'
  };
 
  constructor(
    private route: ActivatedRoute,
    private serviceApi: VehicleService,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    const idParam = this.route.snapshot.params['sId'];
    if (idParam) {
      this.serviceId = Number(idParam);
      this.serviceApi.getServiceById(this.serviceId).subscribe({
        next: (data) => {
          this.service = data;
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = typeof err.error === 'string'
            ? err.error
            : err.error.message || 'Unexpected error occurred';
          this.isError = true;
        }
      });
 
      this.feedbackService.getFeedbackByServiceId(this.serviceId).subscribe({
        next: (feedbackData) => {
          this.feedbacks = feedbackData;
          this.calculateRatings();
        },
        error: () => {
          this.feedbacks = [];
        }
      });
    }
 
    this.vehicleId = +this.route.snapshot.params['vId'];
  }
 
  calculateRatings(): void {
    this.totalRatings = this.feedbacks.length;
    if (this.totalRatings > 0) {
      const sum = this.feedbacks.reduce((acc, fb) => acc + fb.rating, 0);
      this.averageRating = parseFloat((sum / this.totalRatings).toFixed(1));
 
      const counts = [0, 0, 0, 0, 0];
      this.feedbacks.forEach(fb => counts[fb.rating - 1]++);
      this.ratingBreakdown = [
        { label: 'Five', count: counts[4], percentage: (counts[4] / this.totalRatings) * 100 },
        { label: 'Four', count: counts[3], percentage: (counts[3] / this.totalRatings) * 100 },
        { label: 'Three', count: counts[2], percentage: (counts[2] / this.totalRatings) * 100 },
        { label: 'Two', count: counts[1], percentage: (counts[1] / this.totalRatings) * 100 },
        { label: 'One', count: counts[0], percentage: (counts[0] / this.totalRatings) * 100 }
      ];
    }
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