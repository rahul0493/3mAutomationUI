import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable'; 

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: Http) { }
    headers:any;
    login(username: string, password: string) {
      //var headers=new Headers();
     console.log("service");
        this.headers = new Headers({'Content-Type': 'application/json', Authorization: 'Basic ' + btoa(username+':'+password) });
    
      //headers.append('Content-Type','application/json');
        // return this.http.post(environment.apiUrl+'/users/authenticate', { username, password })
        return this.http.post(environment.apiUrl+'/login', {"username":username,"password": password },{headers:this.headers})
           .pipe(map(user => {                
                if (user["_body"]!="") {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                   
                    sessionStorage.setItem('currentUser', user["_body"]);
                    sessionStorage.setItem('headers',JSON.stringify(this.headers));
                    //console.log(this.headers);
                }
                return user;
           }));
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }
}