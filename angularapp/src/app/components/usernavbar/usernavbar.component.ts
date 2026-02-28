import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent implements OnInit {
   username = "";
  dropdownOpen : boolean = false ;
  userId: number;
  showProfile: boolean = false;
  showLogoutPopup: boolean = false;

  constructor(private router: Router) {}
  
  toggleDropdown()
  {
    this.dropdownOpen = !this.dropdownOpen ;
  }

  logout(): void {
    this.showLogoutPopup = true
  }
  confirmLogout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
  cancelLogout(): void {
    this.showLogoutPopup = false;
  }


  


  

  ngOnInit(): void {
    this.username = localStorage.getItem('authenticatedUser');
    this.userId = Number(localStorage.getItem('userId'))

  }

}
