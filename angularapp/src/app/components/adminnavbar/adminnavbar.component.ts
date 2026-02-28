import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {
  
username = "";
role="";
  constructor(private router: Router) {}

 
    dropdownOpen = false;
    showLogoutPopup: boolean = false;

    toggleDropdown(): void {
      this.dropdownOpen = !this.dropdownOpen;
    }
    

    logout(): void {
      console.log("#$$$$$$$$$$$")
      this.showLogoutPopup = true
    }

    ngOnInit(): void {
      this.username = localStorage.getItem('authenticatedUser');
      this.role = localStorage.getItem('role');
    }

    confirmLogout(): void {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
    
    cancelLogout(): void {
      this.showLogoutPopup = false;
    }

}
