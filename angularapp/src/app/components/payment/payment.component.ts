
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RAZORPAY_KEY } from 'src/app/constants/app.constant';
import { Appointment } from 'src/app/models/appointment.model';
import { RazorpayPayment } from 'src/app/models/razorpay-payment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { RazorpayPaymentService } from 'src/app/services/razorpay-payment.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  // @Input() amount!: number;
  // @Input() currency: string = 'INR';
  // @Input() appointmentId!: number;
   amount: number;
   currency: string = 'INR';
   appointmentId: number;
 
  appointment : Appointment ;
  constructor(private paymentService: RazorpayPaymentService ,private router : Router, private actiRoute : ActivatedRoute,private appointmentService : AppointmentService) {
     this.appointmentId = actiRoute.snapshot.params['id'];
     this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
      next :(response)=>
      {
  this.appointment = response ;
  console.log(this.appointment);
  this.amount = this.appointment.service.servicePrice ;
  console.log(this.amount)
      },
      error : (err)=>
      {

      }
     })
    
  }
  ngOnInit(): void {
    
  }

  payNow() {
    const paymentRequest: RazorpayPayment = {
      amount: this.amount,
      currency: this.currency,
      appointment: this.appointment 
    };
    console.log("Iam "+JSON.stringify(paymentRequest));

    this.paymentService.createPayment(paymentRequest).subscribe(order => {
      
      const options = {
        key: RAZORPAY_KEY, // Replace with your Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: 'FIXMYRIDE',
        description: 'Appointment Payment',
        order_id: order.orderId,
        handler: (response: any) => {
          const paymentDetails: RazorpayPayment = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: order.amount,
            currency: order.currency,
            status: 'paid',
            appointment : this.appointment 
          };

          this.paymentService.createPayment(paymentDetails).subscribe(() => {
            alert('Payment successful and saved!');
          });
        },
        prefill: {
          name: this.appointment.user.username,
          email: this.appointment.user.email,
          contact: this.appointment.user.mobileNumber
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
      this.router.navigate(['/user/appointments/view']);
    });
  }
}
