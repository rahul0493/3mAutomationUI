import { Component, OnInit } from '@angular/core';



declare var bootbox:any;
declare var $ :any;
@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css']
})
export class AdminRoleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#roleTable').DataTable().destroy();
      setTimeout(function(){
        $('#roleTable').DataTable({
          responsive: true
        });   
        }, 50);  
  }

}
