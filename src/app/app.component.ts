import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ProfileServiceService} from './APIs/profile-service.service';
// import {SpinnerService} from './auth/spinner.service';

import { Subject } from 'rxjs';
import { Idle } from 'idlejs/dist';
//import { setTimeout } from 'timers';
import { timeout } from 'rxjs/operators';
import { NgNoValidate } from '@angular/forms/src/directives/ng_no_validate_directive';
import { longStackSupport } from 'q';
declare var jquery:any;
declare const $: any;
declare var bootbox:any;

const idle = new Idle()
  .whenNotInteractive()
  .within(10)
  .do(() => {
     console.log('IDLE');
     sessionStorage.clear();
     window.location.href='logout';
     //this.logout();
      //this.router.navigate(['login']);    
      
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
isAdmin:Boolean;
isNgg:Boolean;
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
    var roles=JSON.parse(sessionStorage.getItem('currentUser')); 
    roles=roles.roles; 
    var resAdmin=roles.find(x => x.role === "ADMIN"); 
    var resNgg=roles.find(x => x.role === "NGG_USER");
    if(resAdmin!=undefined){
      this.isAdmin=true;
      this.isNgg=true;
    }
    else{
      this.isAdmin=false;
    }
    if(resNgg!=undefined){
      this.isNgg=true;
    }
    else{
      this.isNgg=false;
    }

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
