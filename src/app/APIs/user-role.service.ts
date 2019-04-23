import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  headers= new HttpHeaders(JSON.parse(sessionStorage.getItem("headers")));
  constructor(private http:HttpClient) { }
 
  getAllEmp(): Observable<any>{
    return this.http.get(environment.apiUrl+'/admin/getAllEmployees ',{headers:this.headers})
    .map(res=>res);
  }

  updateUserRole(data): Observable<any>{
    console.log(data);
    return this.http.post(environment.apiUrl+'/admin/updateUserRole',data,{headers:this.headers,responseType: 'text'})
    .map(res=>res);
  }

}
