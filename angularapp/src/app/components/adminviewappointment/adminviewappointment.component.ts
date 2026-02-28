import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { RazorpayPayment } from 'src/app/models/razorpay-payment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { RazorpayPaymentService } from 'src/app/services/razorpay-payment.service';

@Component({
  selector: 'app-adminviewappointment',
  templateUrl: './adminviewappointment.component.html',
  styleUrls: ['./adminviewappointment.component.css']
})
export class AdminviewappointmentComponent implements OnInit {
    appointments: Appointment[] = [];
    displayedAppointments: Appointment[] = [];
    searchTerm: string = '';
    currentPage : number = 1 ;
itemsPerPage : number = 5 ;
    sortDirection: 'asc' | 'desc' = 'asc';
    paymentStatuses: Record<number, string> = {};
    statuses: string[] = ['Pending', 'Scheduled', 'In-Progress', 'Completed'];
    payment : RazorpayPayment ;
 
    
    constructor(
      private appointmentService: AppointmentService,
      private paymentService: RazorpayPaymentService
    ) {}

    ngOnInit(): void {
      this.loadAppointments();
    }
    
    changeStatus(app: Appointment, newStatus: string) {
      if (app.appointmentId) {
        app.status = newStatus;
        this.appointmentService.updateAppointment(app.appointmentId, app).subscribe({
          next: () => {
            console.log('Status updated');
            this.showSuccessPopup = true;
          },
          error: (err) => console.error('Error updating status:', err)
        });
      }
    }
     
   

    loadAppointments(): void {
      this.appointmentService.getAppointments().subscribe({
        next: (data) => {
          this.appointments = data;
          this.syncPaymentStatuses();
          this.applySearchAndSort();
        },
        error: (err) => console.error('Error fetching appointments:', err)
      });
    }

    applySearchAndSort(): void {
      let list = [...this.appointments];
      const term = this.searchTerm.trim().toLowerCase();

      if (term) {
        list = list.filter(a =>
          (a.service?.serviceName || '').toLowerCase().includes(term)
        );
      }

      list.sort((a, b) => {
        const dateA = new Date(a.appointmentDate).getTime();
        const dateB = new Date(b.appointmentDate).getTime();
        return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      });

      this.displayedAppointments = list;
      this.currentPage=1;
    }

    onSearch(): void {
      this.applySearchAndSort();
    }

    toggleSortDirection(): void {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.applySearchAndSort();
    }

    syncPaymentStatuses(): void {
      
this.appointments.forEach(app => {
  this.paymentService.getPaymentByAppointmentId(app.appointmentId).subscribe({
    next: (param) => {
      this.payment = param;
      this.paymentStatuses[app.appointmentId] = this.payment?.status || 'Pending';
    },
    error: (err) => {
      console.warn(`No payment found for appointmentId ${app.appointmentId}`, err);
      this.paymentStatuses[app.appointmentId] = 'Pending'; // fallback if payment not found
    }
  });
});
    }

    markAsPaid(app: Appointment): void {
      if (!app.appointmentId) return;

      app.paymentStatus = 'Paid';
      this.paymentStatuses[app.appointmentId] = 'Paid';
      this.paymentService.getPaymentByAppointmentId(app.appointmentId).subscribe({
        next: (param) => {
          this.payment = param;
          this.payment.status = 'Paid'
          this.paymentService.updatePayment(this.payment.id,this.payment).subscribe(
            {
              next: () =>
              {
               
              },
              error:()=>
              {

              }

            }
          )
        },
        error: (err) => {
          console.warn(`No payment found for appointmentId ${app.appointmentId}`, err);
          this.paymentStatuses[app.appointmentId] = 'Pending'; // fallback if payment not found
        }
      });
     
    }
showSuccessPopup: boolean = false;



closePopup(): void {
  this.showSuccessPopup = false;
}
    getPaymentClass(status: string | undefined): string {
      if (!status) return 'status-badge black';
      const s = status.toLowerCase();
      if (s.includes('paid') || s.includes('captured')) return 'status-badge green';
      if (s.includes('pending')) return 'status-badge red';
      if (s.includes('failed')) return 'status-badge red';
      return 'status-badge black';
    }

    getPaginatedAppointments(): any[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.displayedAppointments.slice(startIndex, endIndex);
    }
 
    getTotalPages(): number {
      return Math.ceil(this.displayedAppointments.length / this.itemsPerPage);
    }
 
}



 
   
