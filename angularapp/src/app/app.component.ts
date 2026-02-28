import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularapp';

  role: string | null = null;

  ngOnInit(): void {
   
  }


  constructor() {  this.role = localStorage.getItem('role'); }

}
