import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.isLoggedin()) {
      const allowedRoles: string[] = route.data['roles']; // expecting an array
      const currRole = localStorage.getItem('role');
  
      console.log('Allowed Roles:', allowedRoles);
      console.log('Current Role:', currRole);
  
      if (allowedRoles && !allowedRoles.includes(currRole || '')) {
        console.log("Access denied: role not allowed");
        return this.router.parseUrl('/home');
      }
  
      return true;
    } else {
      console.log("Access denied: not logged in");
      return this.router.parseUrl('/login');
    }
  }

}
