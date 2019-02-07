import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ResetPassAPIsService} from '../APIs/reset-pass-apis.service';
import {Router} from '@angular/router';

declare var bootbox:any;
declare var $ :any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  connectionList=[];
  btnName:String;
  edit={};
  constructor(private router:Router,private resetPassApi:ResetPassAPIsService) { }

  ngOnInit() {
    this.btnName="Add";
    // this.resetPassApi.getAllConn()
    // .subscribe(res=>{   
    this.connectionList=[
      {
          "id": 35,
          "connectionName": "Conn1",
          "userName": "User1",
          "currentPassword": "Pass1",
          "hostName": "Host1",
          "port": 1,
          "serviceName": "Service1",
          "newPassword": null,
          "confirmPassword": null
      },
      {
        "id": 37,
        "connectionName": "Conn2",
        "userName": "User2",
        "currentPassword": "Pass2",
        "hostName": "Host2",
        "port": 2,
        "serviceName": "Service2",
        "newPassword": null,
        "confirmPassword": null
    },
    {
      "id": 39,
      "connectionName": "Conn3",
      "userName": "User3",
      "currentPassword": "Pass3",
      "hostName": "Host3",
      "port": 3,
      "serviceName": "Service3",
      "newPassword": null,
      "confirmPassword": null
  },
  {
    "id": 51,
    "connectionName": "Conn4",
    "userName": "User4",
    "currentPassword": "Pass4",
    "hostName": "Host4",
    "port": 4,
    "serviceName": "Service4",
    "newPassword": null,
    "confirmPassword": null
},
{
  "id": 25,
  "connectionName": "Conn5",
  "userName": "User5",
  "currentPassword": "Pass5",
  "hostName": "Host5",
  "port": 5,
  "serviceName": "Service5",
  "newPassword": null,
  "confirmPassword": null
}

  ]   
    $('#connDetailsTable').DataTable().destroy();
      setTimeout(function(){
        $('#connDetailsTable').DataTable({
          responsive: true
         // dom: 'lBfrtip',
        //   buttons: [
        //     {
        //         text: '<i class="fa fa-plus-circle"> Add New</i>',
        //         action: ( e, dt, node, config ) =>{                                      
        //             $('#myModal').modal('toggle');                           
        //         }
        //     }
        // ]
        });   
        // $('.dt-buttons a').removeClass('dt-button').addClass('btn btn-success btn-sm'); 
        // $('.dt-buttons').css('padding-left','20px')  ;
        }, 50);  
      // });
  }  
 
}
