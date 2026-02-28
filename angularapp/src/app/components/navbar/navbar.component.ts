import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  userRole: string | null = null;

  ngOnInit(): void {
    this.authService.role$.subscribe(role => {
      this.userRole = role;
    });
  }


  constructor(private authService : AuthService , private router: Router) { 
    this.router.events.subscribe(event => {
       if (event instanceof NavigationEnd) {
         this.updateNavbar();
       }
     });
    }

    updateNavbar(): void {
      this.userRole = this.authService.getRole(); // or use observable if you have one
    }
  

}
