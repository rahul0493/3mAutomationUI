import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { SpinnerService } from '../auth/spinner.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class HostDetailAPIsService {
  public visibility: boolean = false;
  headers= new Headers(JSON.parse(sessionStorage.getItem("headers")));
 
  constructor(private http:Http) { }

 
  getEnvironmentList(){
    return this.http.get(environment.apiUrl+'/host/getAllHostDetails',{headers:this.headers})
    .map(res=>res.json());
  }
  
  createEnvironment(hostDetail){
    return this.http.post(environment.apiUrl+'/host/save',hostDetail,{headers:this.headers})
    .map(res=>res.text);
  }
  
  createHost(hostDetail){
    if(hostDetail.id==null){
      hostDetail.id=0;
    }
    return this.http.put(environment.apiUrl+'/host/updateHostDetailsbyId/'+hostDetail.id,hostDetail,{headers:this.headers})
    .map(res=>res.text);
  }

  deleteHostById(id){ 
      return this.http.delete(environment.apiUrl+'/host/deleteHostDetailsbyId/'+id,{headers:this.headers})
      .map(res=>res.text());  
  }

}
