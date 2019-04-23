import { Component, OnInit } from '@angular/core';
import { HomeAPIsService } from '../APIs/home-apis.service';
import { Router } from '@angular/router';

declare var bootbox:any;
declare var $ :any;
@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.component.html',
  styleUrls: ['./server-status.component.css']
})
export class ServerStatusComponent implements OnInit {
serverStatusArr:any;
  constructor(private homeServ:HomeAPIsService,private router:Router) { }

  ngOnInit() {
    
    this.homeServ.getServerStatus()
    .subscribe((res)=>{
      this.serverStatusArr=res;
      console.log(this.serverStatusArr)
      $('.envTable').DataTable().destroy();
      setTimeout(function(){
      $('.envTable').DataTable({
        responsive: true
      });   
      }, 50);  
    })
  }
}
