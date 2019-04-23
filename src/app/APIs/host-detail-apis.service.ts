import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { SpinnerService } from '../auth/spinner.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostDetailAPIsService {
  public visibility: boolean = false;
  headers= new HttpHeaders(JSON.parse(sessionStorage.getItem("headers")));
 
  constructor(private http:HttpClient) { }

 
  getEnvironmentList(): Observable<any>{
    return this.http.get(environment.apiUrl+'/host/getAllHostDetails',{headers:this.headers})
    .map(res=>res);
  }
  
  createEnvironment(hostDetail): Observable<any>{
    return this.http.post(environment.apiUrl+'/host/save',hostDetail,{headers:this.headers,responseType: 'text' })
    .map(res=>res);
  }
  
  createHost(hostDetail): Observable<any>{
    if(hostDetail.id==null){
      hostDetail.id=0;
    }
    return this.http.put(environment.apiUrl+'/host/updateHostDetailsbyId/'+hostDetail.id,hostDetail,{headers:this.headers,responseType: 'text'})
    .map(res=>res);
  }

  deleteHostById(id): Observable<any>{ 
      return this.http.delete(environment.apiUrl+'/host/deleteHostDetailsbyId/'+id,{headers:this.headers,responseType: 'text'})
      .map(res=>res);  
  }

}
