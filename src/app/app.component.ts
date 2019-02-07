import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard3M'; 
  ngOnInit(){
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
  }
}
