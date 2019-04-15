import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class NewPassAPIsService {
  

  constructor(private http:Http) { }
  headers= new Headers(JSON.parse(sessionStorage.getItem("headers")));
  getEnvironmentList(){
    return this.http.get(environment.apiUrl+'/host/getAllHostDetails',{headers:this.headers})
    .map(res=>res.json());
  }

  readServerFile(id,fileName){
    return this.http.get(environment.apiUrl+'/newPassword/readServerFile/'+id,{headers:this.headers,params:{
      fileName:fileName
    }})
    .map(res=>res.json());
  }

  getNewPasswordList(id,fileName){
    return this.http.get(environment.apiUrl+'/newPassword/getAllNewPassword/'+id,{headers:this.headers,params:{
      fileName:fileName
    }})
    .map(res=>res.json());
  }
  
  savePass(data,fileName){    
      return this.http.post(environment.apiUrl+'/newPassword/saveNewPassword',data,{headers:this.headers,params:{
        fileName:fileName
      }})
      .map(res=>res.text);  
  
  }
  changeServerFile(data,fileName){    
    return this.http.post(environment.apiUrl+'/ChangePassword/changePasswordbyId/'+data.id,data,{headers:this.headers,params:{
      fileName:fileName
    }})
    .map(res=>res.text);  

}

backupServerFile(data,fileName){    
  return this.http.post(environment.apiUrl+'/ChangePassword/createBackup/'+data.id,data,{headers:this.headers, params:{
    fileName:fileName
  }})
  .map(res=>res.text);  

}

crontabBackup(data){    
  return this.http.post(environment.apiUrl+'/ChangePassword/cronBackUp/'+data.id,data,{headers:this.headers})
  .map(res=>res.text);  

}
createCrontab(data){    
  return this.http.post(environment.apiUrl+'/ChangePassword/createCronTab/'+data.id,data,{headers:this.headers})
  .map(res=>res.text);  

}
getFileName(id): any {
  return this.http.get(environment.apiUrl+'/newPassword/getAllFileName/'+id,{headers:this.headers})
    .map(res=>res.json());
}

}
