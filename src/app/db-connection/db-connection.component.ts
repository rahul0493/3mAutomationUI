import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ResetPassAPIsService} from '../APIs/reset-pass-apis.service';
import {Router} from '@angular/router';

declare var bootbox:any;
declare var $ :any;

@Component({
  selector: 'app-db-connection',
  templateUrl: './db-connection.component.html',
  styleUrls: ['./db-connection.component.css']
})
export class DbConnectionComponent implements OnInit {
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
          responsive: true,
          dom: 'lBfrtip',
          buttons: [
            {
                text: '<i class="fa fa-plus-circle"> Add New</i>',
                action: ( e, dt, node, config ) =>{                                      
                    $('#myModal').modal('toggle');                           
                }
            }
        ]
        });   
        $('.dt-buttons a').removeClass('dt-button').addClass('btn btn-success btn-sm'); 
        $('.dt-buttons').css('padding-left','20px')  ;
        }, 50);  
      // });
  }  
  addConnection(){
    this.btnName="Add";
  }

  editConn(id){
    this.btnName="Update";
    this.resetPassApi.getConnById(id)
    .subscribe(res=>{
      this.edit=res[0];
    })
  }

  updateConn(type){
    console.log(this.edit);
    if(type=="Add"){
      this.resetPassApi.createConn(this.edit)
      .subscribe(res=>{
        this.ngOnInit();
        bootbox.alert('<label>Created Succesfully</label>');   
      })
    }
    else{
      this.resetPassApi.updateConn(this.edit)
      .subscribe(res=>{
        this.ngOnInit();
      })
    }
    $('#modalClose').click();
    this.edit={};
  }

  deleteConn(id:any){
    var hosts=this.connectionList;
    bootbox.confirm("<label>Are you sure, you want to delete?</label>",(result)=>{
      if(result==true){          
        this.deleteFunction(hosts,id);
      }   
    });    
  }

  deleteFunction(hosts,id){
    this.resetPassApi.deleteConnById(id)
          .subscribe(res=>{
      if(res.n==1){
        for(var i=0;i<hosts.length;i++){
          if(hosts[i]._id==id){            
            hosts.splice(i,1); 
            $('#hostDetailsTable').DataTable().destroy();
            setTimeout(function(){
              $('#hostDetailsTable').DataTable({
                responsive: true
              });              
              }, 50);               
            bootbox.alert("<label>Deleted Successfully</label>");
          }
        }
      }
    })
  }
}

