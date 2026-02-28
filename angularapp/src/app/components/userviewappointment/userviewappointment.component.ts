import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userviewappointment',
  templateUrl: './userviewappointment.component.html',
  styleUrls: ['./userviewappointment.component.css']
})
export class UserviewappointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;


  statusOrder: ReadonlyArray<string> = ['Pending', 'Scheduled', 'In Progress', 'Completed'];

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.authService.getAuthenticatedUserId();
    this.appointmentService.getAppointmentsByUserId(id).subscribe(data => {
      this.appointments = data.reverse();
      this.appointments = this.appointments.map(a => ({
        ...a,
        status: (a.status ?? '').trim()
      }));
    });
  }

  openDetails(appointment: Appointment) {
    this.selectedAppointment = appointment;
  }

  closeDetails() {
    this.selectedAppointment = null;
  }

  addFeedback(appointment: Appointment) {
    this.router.navigate(['user/feedback',appointment.appointmentId]);
  }

  getStatusClass(stepIndex: number, status: string): string {
    const statusOrder = ['Pending', 'Scheduled', 'In Progress', 'Completed'];
    const normalized = (status || '').trim();
    const currentIndex = statusOrder.indexOf(normalized);
  
    if (currentIndex === -1) return stepIndex === 0 ? 'current' : 'future';

    if (normalized === 'Completed') return 'complete';
  
    if (stepIndex < currentIndex) return 'complete';
    if (stepIndex === currentIndex) return 'current';
    return 'future';
  }

}
