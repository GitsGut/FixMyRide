import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';
import { API_URL } from '../constants/app.constant';
import { Address } from '../models/address.model';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http:HttpClient) { }

  addAddress(address:Address):Observable<Address>{
    return this.http.post<Address>(API_URL+"/appointment/address",address);
  }

  addAppointment(appointment:Appointment):Observable<Appointment>{
    return this.http.post<Appointment>(API_URL+"/appointment",appointment);
  }

  getAppointments():Observable<Appointment[]>{
    return this.http.get<Appointment[]>(API_URL+"/appointment");
  }

  updateAppointment(appointmentId:number,appointment:Appointment):Observable<Appointment>{
    return this.http.put<Appointment>(API_URL+"/appointment/"+appointmentId,appointment);
  }

  deleteAppointment(appointmentId:number):Observable<void>{
    return this.http.delete<void>(API_URL+"/appointment/"+appointmentId);
  }

  getAppointmentsByUserId(userId:number):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(API_URL+"/appointment/"+userId);
  }

  getAppointmentById(appointmentId:number):Observable<Appointment>{
    return this.http.get<Appointment>(API_URL+"/appointment/base/"+appointmentId);
  }
}
