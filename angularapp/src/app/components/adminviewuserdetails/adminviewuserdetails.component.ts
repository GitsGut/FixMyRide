import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserdetailsService } from 'src/app/services/userdetails.service';

@Component({
  selector: 'app-adminviewuserdetails',
  templateUrl: './adminviewuserdetails.component.html',
  styleUrls: ['./adminviewuserdetails.component.css']
})
export class AdminviewuserdetailsComponent implements OnInit {

  constructor(private service : UserdetailsService) { }
 users : User[] = [];
  ngOnInit(): void {
    this.service.getAllUsers().subscribe(param=>
      {
        this.users = param ;
        this.users = this.users.filter((r)=> r.userRole=='USER')
      })
  }
  
  deleteUser(id:number)
  {
    this.service.deleteUser(id).subscribe(param=>
      {
        this.ngOnInit();
      })
  }

  

}
