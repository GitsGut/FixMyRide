import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminaddserviceComponent } from './components/adminaddservice/adminaddservice.component';
import { AdminviewserviceComponent } from './components/adminviewservice/adminviewservice.component';
import { AdminviewappointmentComponent } from './components/adminviewappointment/adminviewappointment.component';
import { UseraddappointmentComponent } from './components/useraddappointment/useraddappointment.component';
import { UserviewappointmentComponent } from './components/userviewappointment/userviewappointment.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { RouterLink } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { UsernavbarComponent } from './components/usernavbar/usernavbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminviewuserdetailsComponent } from './components/adminviewuserdetails/adminviewuserdetails.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorAuthService } from './services/http-interceptor-auth.service';
import { LoadingComponent } from './components/loading/loading.component';
import {  NgxSpinnerModule } from 'ngx-spinner';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';
import { BikeServicesComponent } from './components/bike-services/bike-services.component';
import { CarServicesComponent } from './components/car-services/car-services.component';
import { VehicleSelectionComponent } from './components/vehicle-selection/vehicle-selection.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FooterComponent } from './components/footer/footer.component';
import { VehicleAiComponent } from './components/vehicle-ai/vehicle-ai.component';
import { SuperNavbarComponent } from './components/super-navbar/super-navbar.component';








@NgModule({
  declarations: [
    AppComponent,
    AdminnavbarComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    AdminaddserviceComponent,
    AdminviewserviceComponent,
    AdminviewappointmentComponent,
    UseraddappointmentComponent,
    UserviewappointmentComponent ,
    UseraddfeedbackComponent,
    UserviewfeedbackComponent,
    AdminviewfeedbackComponent ,
    RegistrationComponent,
    UsernavbarComponent,
    AdminviewuserdetailsComponent,
    LoadingComponent,
    SuperAdminDashboardComponent,
    BikeServicesComponent,
    CarServicesComponent,
    VehicleSelectionComponent,
    ServiceDetailsComponent,
    PaymentComponent,
    FooterComponent,
    VehicleAiComponent,
    SuperNavbarComponent



  
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule 
  ],
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useClass:HttpInterceptorAuthService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
