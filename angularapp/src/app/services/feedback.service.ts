import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http : HttpClient) { }

  public createFeedback(feedback:Feedback):Observable<Feedback>{
    return this.http.post<Feedback>(API_URL+"/feedback", feedback)
  }

  public getAllFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(API_URL+"/feedback")
  }

  public updateFeedback(feedbackId:number, feedback:Feedback):Observable<Feedback>{
    return this.http.put<Feedback>(API_URL+"/feedback"+"/"+feedbackId,feedback)
  }

  public deleteFeedback(feedbackId:number):Observable<void>{
    return this.http.delete<void>(API_URL+"/feedback"+"/"+feedbackId)
  }

  public getFeedbackByUserId(userId:number):Observable<Feedback[]>{
    return this.http.get<Feedback[]>(API_URL+"/feedback"+"/user/"+userId)
  }

  public getFeedbackByServiceId(serviceId:number):Observable<Feedback[]>{
    return this.http.get<Feedback[]>(API_URL+"/feedback"+"/service/"+serviceId)
  }
}
