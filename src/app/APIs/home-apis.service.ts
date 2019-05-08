import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeAPIsService {
  public visibility: boolean = false;

  headers= new HttpHeaders(JSON.parse(sessionStorage.getItem("headers")));
  constructor(private http:HttpClient) {
    
   }
 
  getServerStatus(): Observable<any>{
    return this.http.get(environment.apiUrl+'/serverHealth/fetchServerHealth',{headers:this.headers})
    .map(res=>res);
  }

  getMonthlyShiftResource(month,year): Observable<any>{
     return this.http.get(environment.apiUrl+'/EventHandller/getShiftPlanMonthlyData',{headers:this.headers,params:{monthId:month,year:year}})
    //return this.http.get('../assets/json/shiftPlan.json')
    .map(res=>res);
  }

  getDailyShiftResource(): Observable<any>{
    return this.http.get(environment.apiUrl+'/EventHandller/getShiftPlanDayData',{headers:this.headers})
   //return this.http.get('../assets/json/shiftPlan.json')
   .map(res=>res);
 }

  getAllEvent(): Observable<any>{
    return this.http.get(environment.apiUrl+'/EventHandller/getAllEvent',{headers:this.headers})
    .map(res=>res);
  }

  getUpcomingEvent(): Observable<any>{
    return this.http.get(environment.apiUrl+'/EventHandller/getAllUpcomingEvent',{headers:this.headers})
    .map(res=>res);
  }

  createNewEvent(eventDetail): Observable<any>{
    return this.http.post(environment.apiUrl+'/EventHandller/saveEvent',eventDetail,{headers:this.headers,responseType: 'text' })
    .map(res=>res);
  }

  deleteEvent(id): Observable<any>{ 
    return this.http.delete(environment.apiUrl+'/EventHandller/deleteEvent/'+id,{headers:this.headers,responseType: 'text'})
    .map(res=>res);  
  }

  updateEvent(eventDetail): Observable<any>{   
    return this.http.put(environment.apiUrl+'/EventHandller/updateEvent/'+eventDetail.id,eventDetail,{headers:this.headers,responseType: 'text'})
    .map(res=>res);
  }
}
