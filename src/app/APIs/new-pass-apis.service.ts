import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class NewPassAPIsService {

  constructor(private http:Http) { }
  headers= new Headers(JSON.parse(sessionStorage.getItem("headers")));
  getEnvironmentList(){
    return this.http.get(environment.apiUrl+'/host/getAllHostDetails',{headers:this.headers})
    .map(res=>res.json());
  }

  readServerFile(id){
    return this.http.get(environment.apiUrl+'/newPassword/readServerFile/'+id,{headers:this.headers})
    .map(res=>res.json());
  }

  getNewPasswordList(id){
    return this.http.get(environment.apiUrl+'/newPassword/getAllNewPassword/'+id,{headers:this.headers})
    .map(res=>res.json());
  }
  
  savePass(data){    
      return this.http.post(environment.apiUrl+'/newPassword/saveNewPassword',data,{headers:this.headers})
      .map(res=>res.text);  
  
  }
}
