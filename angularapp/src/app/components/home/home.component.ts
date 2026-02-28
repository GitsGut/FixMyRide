import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  showChatbot = false;

  toggleChatbot() {
    this.showChatbot = !this.showChatbot;
  }

  role: any ;

  constructor(private authService: AuthService , private router : Router ) {}

  ngOnInit(): void {

    this.isLoggedIn = this.authService.isLoggedin();

    this.role = this.authService.getRole();

  }

  goToService(){
    this.router.navigate(['/user/vehicle/selection'])
  }
  goToFeedback(){
    this.router.navigate(['/admin/feedback'])
  }
}
