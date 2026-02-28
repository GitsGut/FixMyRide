import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../constants/app.constant';
import { RazorpayPayment } from '../models/razorpay-payment';

@Injectable({
  providedIn: 'root'
})
export class RazorpayPaymentService {
  constructor(private http: HttpClient) {}

  createPayment(payment: RazorpayPayment): Observable<RazorpayPayment> {
    return this.http.post<RazorpayPayment>(`${API_URL}/payment/create`, payment);
  }
  createCashPayment(payment: RazorpayPayment): Observable<RazorpayPayment> {
    return this.http.post<RazorpayPayment>(`${API_URL}/payment/createCash`, payment);
  }

  updatePayment(id: number, payment: RazorpayPayment): Observable<RazorpayPayment> {
    return this.http.put<RazorpayPayment>(`${API_URL}/payment/${id}`, payment);
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/payment/${id}`);
  }

  getAllPayments(): Observable<RazorpayPayment[]> {
    return this.http.get<RazorpayPayment[]>(`${API_URL}/payment`);
  }

  getPaymentById(id: number): Observable<RazorpayPayment> {
    return this.http.get<RazorpayPayment>(`${API_URL}/payment/${id}`);
  }

  
 getPaymentByAppointmentId(appointmentId: number): Observable<RazorpayPayment> {
  return this.http.get<RazorpayPayment>(`${API_URL}/payment/appointment/${appointmentId}`);
}

}
