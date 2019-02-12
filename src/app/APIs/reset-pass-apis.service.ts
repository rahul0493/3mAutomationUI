import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

const   headers= new Headers({'Content-Type': 'application/json', Authorization: 'Basic cmFodWx5OkJlaGFwcHlAMDQyNQ== '})
;
@Injectable({
  providedIn: 'root'
})

export class ResetPassAPIsService {

  constructor(private http:Http) { }
  
  getAllConn(){
    return this.http.get('http://localhost:8081/ResetPassword/getAllConnectionDetails',{headers:headers})
    .map(res=>res.json());
  }

  updateConn(updateDetail){
   
    return this.http.put('http://localhost:8081/ResetPassword/updateConnectionDetailsById/'+updateDetail.id,updateDetail,{headers:headers})
    .map(res=>res.text);
  }
  
  resetPassword(data){    
    return this.http.post('http://localhost:8081/ResetPassword/ResetDataBasePassword',data,{headers:headers})
    .map(res=>res.text());
  }
  checkStatusById(id){    
    return this.http.post('http://localhost:8081/ResetPassword/checkDbPasswordStatus',id,{headers:headers})
    .map(res=>res.text());
  }
}
