import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';

import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class ResetPassAPIsService {

  constructor(private http:Http) { }

  getAllConn(){
    return this.http.get('http://localhost:3000/host/getAllHostDetails')
    .map(res=>res.json());
  }
  createConn(hostDetail){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/host/save',hostDetail,{headers:headers})
    .map(res=>res.json());
  }

  updateConn(updateDetail){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/host/save',updateDetail,{headers:headers})
    .map(res=>res.json());
  }
  getConnById(id){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/host/save',{id},{headers:headers})
    .map(res=>res.json());
  }

  deleteConnById(id){    
    return this.http.delete('http://localhost:3000/host/getAllHostDetails')
    .map(res=>res.json());
  }
}
