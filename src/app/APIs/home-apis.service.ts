import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeAPIsService {
  public visibility: boolean = false;

  headers= new HttpHeaders(JSON.parse(sessionStorage.getItem("headers")));
  constructor(private http:HttpClient) {
    
   }
 
  getServerStatus(): Observable<any>{
    return this.http.get(environment.apiUrl+'/serverHealth/fetchServerHealth',{headers:this.headers})
    .map(res=>res);
  }
}
