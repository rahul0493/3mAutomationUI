import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ResetPassAPIsService {
  headers= new HttpHeaders(JSON.parse(sessionStorage.getItem("headers")));
  constructor(private http:HttpClient) { }
  
  getAllConn(): Observable<any>{
    return this.http.get(environment.apiUrl+'/ResetPassword/getAllConnectionDetails',{headers:this.headers})
    .map(res=>res);
  }

  updateConn(updateDetail): Observable<any>{
   
    return this.http.put(environment.apiUrl+'/ResetPassword/updateConnectionDetailsById/'+updateDetail.id,updateDetail,{headers:this.headers,responseType: 'text'})
    .map(res=>res);
  }
  
  resetPassword(data): Observable<any>{    
    return this.http.post(environment.apiUrl+'/ResetPassword/ResetDataBasePassword',data,{headers:this.headers,responseType: 'text'})
    .map(res=>res);
  }
  checkStatusById(id): Observable<any>{    
    return this.http.post(environment.apiUrl+'/ResetPassword/checkDbPasswordStatus',id,{headers:this.headers,responseType: 'text'})
    .map(res=>res);
  }
}
