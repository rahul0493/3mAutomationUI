import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DbConnectionService {
  headers= new Headers(JSON.parse(sessionStorage.getItem("headers")));
  constructor(private http:Http) { }
    
  getAllConn(){
    return this.http.get(environment.apiUrl+'/ResetPassword/getAllConnectionDetails',{headers:this.headers})
    .map(res=>res.json());
  }

    createConn(hostDetail){
      return this.http.post(environment.apiUrl+'/ResetPassword/saveConnectionDetails',hostDetail,{headers:this.headers})
      .map(res=>res.text);
    }
  
    updateConn(updateDetail){
     
      return this.http.put(environment.apiUrl+'/ResetPassword/updateConnectionDetailsById/'+updateDetail.id,updateDetail,{headers:this.headers})
      .map(res=>res.text);
    }
    
    getConnById(id){
      return this.http.get(environment.apiUrl+'/ResetPassword/getConnectionDetailById/'+id.id,{headers:this.headers})
      .map(res=>res.json());
    }
  
    deleteConnById(id){    
      let body=JSON.stringify({"id":id});
      return this.http.delete(environment.apiUrl+'/ResetPassword/deleteConnectionDetailsById/'+id,{headers:this.headers})
      .map(res=>res.text());
    }
  }
  