import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminviewserviceComponent } from './components/adminviewservice/adminviewservice.component';
import { AdminviewappointmentComponent } from './components/adminviewappointment/adminviewappointment.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { LoginComponent } from './components/login/login.component';
import { UserviewappointmentComponent } from './components/userviewappointment/userviewappointment.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AdminviewuserdetailsComponent } from './components/adminviewuserdetails/adminviewuserdetails.component';
import { AdminaddserviceComponent } from './components/adminaddservice/adminaddservice.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UseraddappointmentComponent } from './components/useraddappointment/useraddappointment.component';
import { AuthGuard } from './services/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SuperAdminDashboardComponent } from './components/super-admin-dashboard/super-admin-dashboard.component';
import { BikeServicesComponent } from './components/bike-services/bike-services.component';
import { CarServicesComponent } from './components/car-services/car-services.component';
import { VehicleSelectionComponent } from './components/vehicle-selection/vehicle-selection.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { RazorpayPaymentService } from './services/razorpay-payment.service';
import { PaymentComponent } from './components/payment/payment.component';
import { VehicleAiComponent } from './components/vehicle-ai/vehicle-ai.component';


const routes: Routes = [
  

  {
    path: 'admin/services/view', component: AdminviewserviceComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN','SUPER_ADMIN'] }
  },
  {
    path: 'admin/services/:id', component: AdminaddserviceComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN','SUPER_ADMIN'] }
  },
  {
    path: 'admin/services',
    component: AdminaddserviceComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN','SUPER_ADMIN'] }
  },
  {
    path: 'admin/appointments',
    component: AdminviewappointmentComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN','SUPER_ADMIN'] }
  },
  {
    path: 'admin/feedback',
    component: AdminviewfeedbackComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN','SUPER_ADMIN'] }
  },
  {
    path: 'admin/users',
    component: AdminviewuserdetailsComponent,
    canActivate: [AuthGuard],
    data: { role: ['ADMIN','SUPER_ADMIN'] }
  },
  { path: 'home', component: HomeComponent },

  {
    path: 'user/feedback/view',
    component: UserviewfeedbackComponent,
    canActivate: [AuthGuard] ,
    data: { role: ['USER'] }
  },
  
  {
    path: 'user/vehicleAI"',
    component: VehicleAiComponent,
    canActivate: [AuthGuard],
    data: { role: ['USER'] }
  },
  {
    path: 'user/appointments/:sId/:vId',
    component: UseraddappointmentComponent,
    canActivate: [AuthGuard],
    data: { role: ['USER'] }
  },
  {
    path: 'user/appointments/view',
    component: UserviewappointmentComponent,
    canActivate: [AuthGuard],
    data: { role: ['USER'] }
  },
  {
    path: 'user/feedback/:id',
    component: UseraddfeedbackComponent,
    canActivate: [AuthGuard],
    data: { role: ['USER'] }
  },
  {
    path:'user/service-details/:sId/:vId',
    component:ServiceDetailsComponent,
    canActivate:[AuthGuard],
    data: {role:['USER']}
  },
  {
    path:'user/services/bike/:vId',
    component:BikeServicesComponent,
    canActivate: [AuthGuard],
    data: { role: ['USER'] }
  },

  {
    path:'user/vehicle/selection',
    component:VehicleSelectionComponent,
    canActivate: [AuthGuard],
    data: { role: ['USER'] }
  },
  {
    path:'user/services/car/:vId',
    component:CarServicesComponent,
    canActivate: [AuthGuard],
    data: { role: ['USER'] }
  },
  {
    path:'user/appointment/payment/:id',
    component: PaymentComponent,
    canActivate: [AuthGuard],
    data: { role: ['USER'] }
  },
  
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  {
    path: 'user/profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { role: ['USER'] }
  },
  {path:'user/super/dashboard' , component : SuperAdminDashboardComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
