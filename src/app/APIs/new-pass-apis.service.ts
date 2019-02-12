import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
const   headers= new Headers({'Content-Type': 'application/json', Authorization: 'Basic cmFodWx5OkJlaGFwcHlAMDQyNQ== '});

@Injectable({
  providedIn: 'root'
})
export class NewPassAPIsService {

  constructor(private http:Http) { }

  getEnvironmentList(){
    return this.http.get('http://localhost:8081/host/getAllHostDetails',{headers:headers})
    .map(res=>res.json());
  }

  readServerFile(id){
    return this.http.get('http://localhost:8081/newPassword/readServerFile/'+id,{headers:headers})
    .map(res=>res.json());
  }

  getNewPasswordList(id){
    return this.http.get('http://localhost:8081/newPassword/getAllNewPassword/'+id,{headers:headers})
    .map(res=>res.json());
  }
  
  savePass(data){    
      return this.http.post('http://localhost:8081/newPassword/saveNewPassword',data,{headers:headers})
      .map(res=>res.text);  
  
  }
}
