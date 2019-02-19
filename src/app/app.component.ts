import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ProfileServiceService} from './APIs/profile-service.service';

import { Idle } from 'idlejs/dist';
declare var jquery:any;
declare const $: any;

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
  constructor(private ProfileServiceService:ProfileServiceService,private router:Router) { 
    this.ProfileServiceService.setNameMethodCalled.subscribe((res)=>{
      if(res==null){      
      this.navBars=false;
      }
      else{
        this.profileName=res.displayName;
        this.navBars=true;
        setTimeout(function(){
          $(".sidebar-dropdown > a").click(function() {
            $(".sidebar-submenu").slideUp(200);
            if (
              $(this)
                .parent()
                .hasClass("active")
            ) {
              $(".sidebar-dropdown").removeClass("active");
              $(this)
                .parent()
                .removeClass("active");
            } else {
              $(".sidebar-dropdown").removeClass("active");
              $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
              $(this)
                .parent()
                .addClass("active");
            }
            //return false;
          });
          
          $("#close-sidebar").on().click(function() {
            $(".page-wrapper").removeClass("toggled");
            return false;
          });
          $("#show-sidebar").on().click(function() {
            $(".page-wrapper").addClass("toggled");
            return false;
          });
        },50);
      }
    });
    } 

  title = 'dashboard3M'; 
  
  ngOnInit(){
    this.ProfileServiceService.setName(sessionStorage.getItem('currentUser')); 
    console.log("appComp");   
  }

  logout(){
    sessionStorage.clear();
    this.ProfileServiceService.setName(sessionStorage.getItem('currentUser'));  
    this.router.navigate(['login']);
  }
}
