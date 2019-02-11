import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DbConnectionService {

  constructor(private http:Http) { }

  getAllEnvList(){
    return this.http.get('http://localhost:3000/host/getAllHostDetails')
    .map(res=>res.json());
  }
  getEnvDeatilByEnvId(id){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/host/save',{id},{headers:headers})
    .map(res=>res.json());
  }

  updateEnvDetails(updateDetail){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/host/save',updateDetail,{headers:headers})
    .map(res=>res.json());
  }
  
  deleteConnById(id){    
    return this.http.delete('http://localhost:3000/host/getAllHostDetails')
    .map(res=>res.json());
  }
}
