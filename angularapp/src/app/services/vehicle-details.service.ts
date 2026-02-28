import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { API_URL } from '../constants/app.constant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleDetailsService {

  private selectedVehicleId: number | null = null;
  
  constructor(private http: HttpClient) {}
  
  setSelectedVehicleId(id: number): void {
    this.selectedVehicleId = id;
  }

  getSelectedVehicleId(): number | null {
    return this.selectedVehicleId;
  }


  public getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(API_URL + '/vehicles');
  }

  public createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(API_URL + '/vehicles', vehicle);
  }

  public updateVehicle(vehicleId: number, updatedVehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(API_URL + '/vehicles/' + vehicleId, updatedVehicle);
  }

  public deleteVehicle(vehicleId: number): Observable<any> {
    return this.http.delete<any>(API_URL + '/vehicles/' + vehicleId);
  }

  public getVehicleById(vehicleId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(API_URL + '/vehicles/' + vehicleId);
  }

  public searchByBrand(brandName: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(API_URL + '/vehicles/brand/' + brandName);
  }

  public filterByType(vehicleType: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(API_URL + '/vehicles/type/' + vehicleType);
  }

  public filterByFuel(fuelType: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(API_URL + '/vehicles/fuel/' + fuelType);
  }

}
