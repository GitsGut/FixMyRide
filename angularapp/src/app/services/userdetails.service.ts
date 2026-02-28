import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  
constructor(private httpClient : HttpClient)
{

}
 
private readonly baseUrl = `${API_URL}/user`;

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl);
  }

  deleteUser(userId: number): Observable<void> {
    return this.httpClient.delete<void>(`${API_URL}/${userId}`);
  }

  getUserByName(name: string): Observable<User> {
    return this.httpClient.get<User>(`${API_URL}/name/${name}`);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/view/profile`, user);
  }

  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${userId}`);
  }
  
  
updateApprovalStatus(user): Observable<any> {
  return this.httpClient.put(`${this.baseUrl}/approval`,user);
}


}


