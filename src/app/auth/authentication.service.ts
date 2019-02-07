import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable'; 

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
      var headers=new Headers();
      headers.append('Content-Type','application/json');
        return this.http.post(environment.apiUrl+'/users/authenticate', { username, password })
        //return this.http.post('http://localhost:3000/api/login', {"email":username,"password": password })
           .pipe(map(user => {
                // login successful if there's a jwt token in the response
                //  const user={ id: 1,
                //   username: "shobanjp01",
                //   password: "admin",
                //   firstName: "Shoban",
                //   lastName: "Babu",
                //   token:"valid"
                // };
                if (user && user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
           }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}