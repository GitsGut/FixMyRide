import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserdetailsService } from 'src/app/services/userdetails.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {
  
  users: User[] = [];

  constructor(private userService : UserdetailsService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(param=>
      {
        this.users = param;
        this.users = this.users.filter((p)=> p.userRole=='ADMIN')
      })
  }

  toggleApproval(user: User): void {
 
    console.log(user.approved);
    this.userService.updateApprovalStatus(user).subscribe({
      next: (param) => {
        this.ngOnInit();
        console.log(param);
      },
      error: err => {
        console.error('Error updating approval status:', err);
      }
    });
  }

}
