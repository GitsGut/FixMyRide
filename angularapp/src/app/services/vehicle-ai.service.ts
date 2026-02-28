import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class VehicleAiService {

  constructor(private httpClient : HttpClient) { } ;

 
  public getResponseVehicleAi(prompt: string) {
    return this.httpClient.post<{ response: string }>(`${API_URL}/gemini/ask`, {
      message: prompt
    });
  }



}
