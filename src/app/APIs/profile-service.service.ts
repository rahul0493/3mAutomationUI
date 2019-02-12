import { Injectable, ɵConsole } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Http,Headers} from '@angular/http'
@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor(private http:Http) { }

  private setNameCallSource = new Subject<any>();
  
  // Observable string streams
  setNameMethodCalled = this.setNameCallSource.asObservable();
  
  setName(data){
    console.log(data);
    this.setNameCallSource.next(JSON.parse(data));
  }
}


