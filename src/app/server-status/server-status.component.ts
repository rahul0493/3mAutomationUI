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


// this.serverStatusArr=[
//   {
//       "environmentId": 5,
//       "environmentName": "env",
//       "nodes": [
//           {
//               "nodeName": "nggapppr01",
//               "nodeId": 12,
//               "timestamp": 1555266302000,
//               "healthStatus": [
//                   {
//                       "name": "Disk",
//                       "percentage": 64,
//                       "color": "#ffd01f"
//                   },
//                   {
//                       "name": "Memory",
//                       "percentage": 91.78,
//                       "color": "#08da08"
//                   }
//               ],
//               "appStatus": "PROD-SI-RUNNING"
//           },
//           {
//               "nodeName": "nggapppr02",
//               "nodeId": 13,
//               "timestamp": 1555266302000,
//               "healthStatus": [
//                   {
//                       "name": "Disk",
//                       "percentage": 90,
//                       "color": "#08da08"
//                   },
//                   {
//                       "name": "Memory",
//                       "percentage": 97.78,
//                       "color": "red"
//                   }
//               ],
//               "appStatus": "PROD-SI-STOPPED"
//           }
//       ]
//   }
// ];



    
  }
}
