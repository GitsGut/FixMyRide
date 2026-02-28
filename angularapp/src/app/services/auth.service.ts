import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { API_URL } from '../constants/app.constant';
import { UserdetailsService } from './userdetails.service';



export const AUTHENTICATED_USER = 'authenticatedUser';
export const TOKEN = 'token';
export const PAGE_ID = 'pageId';
export const USER_ID = 'userId';
export const ROLE = 'role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private roleSubject = new BehaviorSubject<string | null>(this.getAuthenticatedRole());
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient , private userService : UserdetailsService) {}

  
  register(user: User): Observable<any> {
    return this.http.post(`${API_URL}/register`, user);
  }

  
  login(login: Login): Observable<User> {
      
    return this.http.post<User>(`${API_URL}/login`, login).pipe(
      map(data => {
        localStorage.setItem(USER_ID, String(data.userId));
        localStorage.setItem(AUTHENTICATED_USER, login.username);
        localStorage.setItem(TOKEN, `Bearer ${data.token}`);
        localStorage.setItem(ROLE, data.userRole);       
        this.roleSubject.next(data.userRole); // Notify subscribers

        return data;
      })
    );
  }

 
  logout(): void {
    
    
    this.roleSubject.next(null); // Notify subscribers
    localStorage.clear();
  }

  
  isAuthenticated(): boolean {
    return this.getAuthenticatedToken() !== null;
  }

  
  isLoggedin(): boolean {
    return localStorage.getItem(AUTHENTICATED_USER) !== null;
  }

  
  getAuthenticatedUserId(): number {
    return parseInt(localStorage.getItem(USER_ID) || '0', 10);
  }

  
  getAuthenticatedUser(): string | null {
    return localStorage.getItem(AUTHENTICATED_USER);
  }

  
  getAuthenticatedRole(): string | null {
    return localStorage.getItem(ROLE);
  }

  
  getAuthenticatedToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  
  isAdmin(): boolean {
    return this.getAuthenticatedRole() === 'ADMIN';
  }

  
  isUser(): boolean {
    return this.getAuthenticatedRole() === 'USER';
  }


  pageId(): string {
    let pageId = localStorage.getItem(PAGE_ID);
    if (!pageId) {
      localStorage.setItem(PAGE_ID, 'login');
      pageId = 'login';
    }
    return pageId;
  }

 
  setPageId(pageId: string): void {
    localStorage.setItem(PAGE_ID, pageId);
  }

  
  getRole(): string | null {
    return this.getAuthenticatedRole();
  }
  sendOtp(phoneOrEmail: string, method: 'PHONE' | 'EMAIL'): Observable<any> {
    const endpoint = method === 'EMAIL' ? '/user/send/email' : '/otp/send/sms';
    const params = method === 'EMAIL' ? { email: phoneOrEmail } : { phone: phoneOrEmail };

    return this.http.post(`${API_URL}${endpoint}`, null, {
      params: params
    });
  }
  
  
  // Verify OTP for phone or email
  verifyOtp(key: string, otp: string, method: 'PHONE' | 'EMAIL'): Observable<string> {
    const endpoint = method === 'EMAIL' ? '/user/verify/email' : '/otp/verify';
    const params = method === 'EMAIL' ? { email: key, otp } : { key, otp };

    return this.http.post(`${API_URL}${endpoint}`, null, {
      params: params,
      responseType: 'text'
    });
  }


}
