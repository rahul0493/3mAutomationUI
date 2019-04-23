import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DbConnectionService {
  headers= new HttpHeaders(JSON.parse(sessionStorage.getItem("headers")));
  constructor(private http:HttpClient) { }
    
  getAllConn(): Observable<any>{
    return this.http.get(environment.apiUrl+'/ResetPassword/getAllConnectionDetails',{headers:this.headers})
    .map(res=>res);
  }

    createConn(hostDetail): Observable<any>{
      return this.http.post(environment.apiUrl+'/ResetPassword/saveConnectionDetails',hostDetail,{headers:this.headers})
      .map(res=>res);
    }
  
    updateConn(updateDetail): Observable<any>{
     
      return this.http.put(environment.apiUrl+'/ResetPassword/updateConnectionDetailsById/'+updateDetail.id,updateDetail,{headers:this.headers})
      .map(res=>res);
    }
    
    getConnById(id): Observable<any>{
      return this.http.get(environment.apiUrl+'/ResetPassword/getConnectionDetailById/'+id.id,{headers:this.headers})
      .map(res=>res);
    }
  
    deleteConnById(id): Observable<any>{    
      let body=JSON.stringify({"id":id});
      return this.http.delete(environment.apiUrl+'/ResetPassword/deleteConnectionDetailsById/'+id,{headers:this.headers})
      .map(res=>res);
    }
  }
  