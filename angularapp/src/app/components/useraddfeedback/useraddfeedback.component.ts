import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserdetailsService } from 'src/app/services/userdetails.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  userId: number = this.auth.getAuthenticatedUserId();
  feedback: Feedback = {
    message: '',
    rating: null,
    user: {} as User,
    service: {} as any
  };
  user: User;
  appointment: Appointment;
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(
    private service: FeedbackService,
    private router: Router,
    private auth: AuthService,
    private userService: UserdetailsService,
    private appointmentService: AppointmentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const appointmentId = this.activatedRoute.snapshot.params['id'];
    this.userService.getUserById(this.userId).subscribe(userData => {
      this.user = userData;
      this.appointmentService.getAppointmentById(appointmentId).subscribe(appData => {
        this.appointment = appData;
        this.feedback.user = this.user;
        this.feedback.service = this.appointment.service;
      });
    });
  }

  public addFeedback(frm: NgForm) {
    if (frm.valid) {
      console.log('Submitting feedback:', this.feedback);
      this.service.createFeedback(this.feedback).subscribe(savedFeedback => {
        console.log('Feedback saved:', savedFeedback);
        this.router.navigate(['/user/feedback/view']);
      });
    }
  }
}