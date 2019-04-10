import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ProfileServiceService} from './APIs/profile-service.service';
// import {SpinnerService} from './auth/spinner.service';

import { Subject } from 'rxjs';
import { Idle } from 'idlejs/dist';
//import { setTimeout } from 'timers';
import { timeout } from 'rxjs/operators';
declare var jquery:any;
declare const $: any;
declare var bootbox:any;

const idle = new Idle()
  .whenNotInteractive()
  .within(10)
  .do(() => {
     console.log('IDLE');
     sessionStorage.clear();      
     window.location.href = "/login";     
  })
  .start();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
profileName:String;
navBars:Boolean;
// color = 'primary';
// mode = 'indeterminate';
// value = 50;
// isLoading: Subject<boolean> = this.Spinner.isLoading;

  constructor(private ProfileServiceService:ProfileServiceService,private router:Router) { 
    this.ProfileServiceService.setNameMethodCalled.subscribe((res)=>{
      if(res==null){      
      this.navBars=false;
      }
      else{
        this.profileName=res.displayName;
        this.navBars=true;
        
      }
    });
    } 

  title = 'dashboard3M'; 
  
  ngOnInit(){
    this.ProfileServiceService.setName(sessionStorage.getItem('currentUser')); 
    console.log("appComp");   
  }

  logout(){
    bootbox.confirm({
      size: "small",
  message: "<label>Are you sure, you want to logout</label>", 
  callback: (result)=>{ 
    if(result==true){  
      sessionStorage.clear();
      this.ProfileServiceService.setName(sessionStorage.getItem('currentUser'));  
      this.router.navigate(['login']);
        }
  }
});         
  }
}
