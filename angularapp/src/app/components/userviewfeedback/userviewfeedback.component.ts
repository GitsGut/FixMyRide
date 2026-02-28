import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {

  feedbacks:Feedback[] = []
  constructor(private service : FeedbackService, private auth : AuthService) { }

  ngOnInit(): void {
    this.getFeedbackByUserId()
  }
  public getFeedbackByUserId(){
    let id = this.auth.getAuthenticatedUserId();
    this.service.getFeedbackByUserId(id).subscribe(params =>{
      this.feedbacks = params 
    })
  }

  public deleteFeedback(id:number){
    this.service.deleteFeedback(id).subscribe(params=>{
      this.ngOnInit()
    })
  }

}
