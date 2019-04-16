import { Component, OnInit } from '@angular/core';

declare var bootbox:any;
declare var $ :any;
@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.component.html',
  styleUrls: ['./server-status.component.css']
})
export class ServerStatusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.envTable').DataTable().destroy();
    setTimeout(function(){
      $('.envTable').DataTable({
        responsive: true
      });   
      }, 50);  
  }
}
