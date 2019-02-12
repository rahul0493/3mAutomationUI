import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
const   headers= new Headers({'Content-Type': 'application/json', Authorization: 'Basic cmFodWx5OkJlaGFwcHlAMDQyNQ== '});

@Injectable({
  providedIn: 'root'
})
export class HostDetailAPIsService {

  constructor(private http:Http) { }
  
  getEnvironmentList(){
    return this.http.get('http://localhost:8081/host/getAllHostDetails',{headers:headers})
    .map(res=>res.json());
  }
  
  createEnvironment(hostDetail){
    return this.http.post('http://localhost:8081/host/save',hostDetail,{headers:headers})
    .map(res=>res.text);
  }
  
  createHost(hostDetail){
    if(hostDetail.id==null){
      hostDetail.id=0;
    }
    return this.http.put('http://localhost:8081/host/updateHostDetailsbyId/'+hostDetail.id,hostDetail,{headers:headers})
    .map(res=>res.text);
  }

  deleteHostById(id){ 
      return this.http.delete('http://localhost:8081/host/deleteHostDetailsbyId/'+id,{headers:headers})
      .map(res=>res.text());  
  }

}
