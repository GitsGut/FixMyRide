import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';
import { API_URL } from '../constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

   constructor(private http:HttpClient) { }

    public getAllServices():Observable<VehicleMaintenance[]>
    {
      return this.http.get<VehicleMaintenance[]>(API_URL+"/services");
    }

    public addService(service:VehicleMaintenance):Observable<VehicleMaintenance>
    {
      return this.http.post<VehicleMaintenance>(API_URL+"/services",service);
    }

    public updateService(serviceId:number,updatedService:VehicleMaintenance):Observable<VehicleMaintenance>
    {
      return this.http.put<VehicleMaintenance>(API_URL+"/services/"+serviceId,updatedService);
    }

    public deleteService(serviceId:Number):Observable<any>
    {
      return this.http.delete<any>(API_URL+"/services/"+serviceId);
    }

    public getServiceByName(serviceName:string):Observable<VehicleMaintenance[]>
    {
      return this.http.get<VehicleMaintenance[]>(API_URL+"/services"+serviceName);
    }

    public getServiceById(serviceId:number):Observable<VehicleMaintenance>
    {
      return this.http.get<VehicleMaintenance>(API_URL+"/services/"+serviceId);
    }

    
  public checkPendingAppointments(serviceId: number): Observable<boolean> {
    return this.http.get<boolean>(API_URL + "/appointment/services/" + serviceId + "/hasPending");
  }

  public updateServiceStatus(serviceId: number, status: string): Observable<void> {
    return this.http.put<void>(API_URL + "/services/" + serviceId + "/status?status=" + status, {});
  }

    

}
