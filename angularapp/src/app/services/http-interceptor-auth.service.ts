import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorAuthService {

  constructor(private authService: AuthService, private errorService: ErrorService, private router: Router , private spinner: NgxSpinnerService
    ) { }
 

  intercept(request: HttpRequest<any>, next: HttpHandler) {
 
     this.spinner.show();

    let basicAuthHeaderString = this.authService.getAuthenticatedToken();

    let username = this.authService.getAuthenticatedUser();

    if (basicAuthHeaderString && username) {

      request = request.clone({

        setHeaders: {

          Authorization: basicAuthHeaderString

        }

      })

    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        let userFriendlyMessage = 'An unexpected error occurred. Please try again later.';
       console.log("***********************************************")
        console.log(error)
        if (error.status === 500) {
          const errorMsg = error?.error?.message || '';
          if (errorMsg.includes('JWT strings must contain exactly 2 period characters')) {
            userFriendlyMessage = 'Your session has expired or is invalid. Please log in again.';
            localStorage.clear();
            this.router.navigate(['/']);
          } else {
            userFriendlyMessage = 'Something went wrong on the server. Please try again later.';
          }
        }
        else if (error.error) {
            userFriendlyMessage = error.error;

          }
        

          this.errorService.showError(userFriendlyMessage);
          return throwError(() => error);

        }),
              finalize(() => {
                this.spinner.hide(); 
              })
              );
            }
          }
          