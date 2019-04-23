import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewPassAPIsService {
  

  constructor(private http:HttpClient) { }
  headers= new HttpHeaders(JSON.parse(sessionStorage.getItem("headers")));
  getEnvironmentList(): Observable<any>{
    return this.http.get(environment.apiUrl+'/host/getAllHostDetails',{headers:this.headers})
    .map(res=>res);
  }

  readServerFile(id,fileName): Observable<any>{
    return this.http.get(environment.apiUrl+'/newPassword/readServerFile/'+id,{headers:this.headers,params:{
      fileName:fileName
    }})
    .map(res=>res);
  }

  getNewPasswordList(id,fileName): Observable<any>{
    return this.http.get(environment.apiUrl+'/newPassword/getAllNewPassword/'+id,{headers:this.headers,params:{
      fileName:fileName
    }})
    .map(res=>res);
  }
  
  savePass(data,fileName): Observable<any>{    
      return this.http.post(environment.apiUrl+'/newPassword/saveNewPassword',data,{headers:this.headers,responseType: 'text',params:{
        fileName:fileName
      }})
      .map(res=>res);  
  
  }
  changeServerFile(data,fileName): Observable<any>{    
    return this.http.post(environment.apiUrl+'/ChangePassword/changePasswordbyId/'+data.id,data,{headers:this.headers,responseType: 'text',params:{
      fileName:fileName
    }})
    .map(res=>res);  

}

backupServerFile(data,fileName): Observable<any>{    
  return this.http.post(environment.apiUrl+'/ChangePassword/createBackup/'+data.id,data,{headers:this.headers,responseType: 'text', params:{
    fileName:fileName
  }})
  .map(res=>res);  

}

crontabBackup(data): Observable<any>{    
  return this.http.post(environment.apiUrl+'/ChangePassword/cronBackUp/'+data.id,data,{headers:this.headers,responseType: 'text'})
  .map(res=>res);  

}
createCrontab(data): Observable<any>{    
  return this.http.post(environment.apiUrl+'/ChangePassword/createCronTab/'+data.id,data,{headers:this.headers,responseType: 'text'})
  .map(res=>res);  

}
getFileName(id):Observable<any> {
  return this.http.get(environment.apiUrl+'/newPassword/getAllFileName/'+id,{headers:this.headers})
    .map(res=>res);
}

}
