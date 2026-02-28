import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
errorMessage: string = '';
isError : boolean = false ;
 user : User = null ;
      loginData: Login = {
        username: '',
        password: ''
      };

      loginFailedToggle = false ;
      constructor(private authService: AuthService, private router: Router) { }

      login() {
         
if (this.loginData.username && this.loginData.password) {
  console.log(this.loginData);

  this.authService.login(this.loginData).subscribe({
    next: (response) => {
      console.log(response.userRole);
      this.user = response;
      console.log("MY Response", this.user);

      if (response.userRole === 'SUPER_ADMIN') {
        this.router.navigate(['/user/super/dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    },
    error: (error: HttpErrorResponse) => {
    
    }
  });
}

      }
    }



