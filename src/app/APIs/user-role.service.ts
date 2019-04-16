import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  headers= new Headers(JSON.parse(sessionStorage.getItem("headers")));
  constructor(private http:Http) { }
 
  getAllEmp(){
    return this.http.get(environment.apiUrl+'/admin/getAllEmployees ',{headers:this.headers})
    .map(res=>res.json());
  }

  updateUserRole(data){
    return this.http.post(environment.apiUrl+'/admin/updateUserRole',data,{headers:this.headers})
    .map(res=>res.text);
  }

}
