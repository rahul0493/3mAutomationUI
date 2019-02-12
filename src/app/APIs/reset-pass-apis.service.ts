import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})

export class ResetPassAPIsService {
  headers= new Headers(JSON.parse(sessionStorage.getItem("headers")));
  constructor(private http:Http) { }
  
  getAllConn(){
    return this.http.get(environment.apiUrl+'/ResetPassword/getAllConnectionDetails',{headers:this.headers})
    .map(res=>res.json());
  }

  updateConn(updateDetail){
   
    return this.http.put(environment.apiUrl+'/ResetPassword/updateConnectionDetailsById/'+updateDetail.id,updateDetail,{headers:this.headers})
    .map(res=>res.text);
  }
  
  resetPassword(data){    
    return this.http.post(environment.apiUrl+'/ResetPassword/ResetDataBasePassword',data,{headers:this.headers})
    .map(res=>res.text());
  }
  checkStatusById(id){    
    return this.http.post(environment.apiUrl+'/ResetPassword/checkDbPasswordStatus',id,{headers:this.headers})
    .map(res=>res.text());
  }
}
