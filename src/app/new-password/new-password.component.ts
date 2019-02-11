import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NewPassAPIsService} from '../APIs/new-pass-apis.service';
import {Router,ActivatedRoute} from '@angular/router';

declare var jquery:any;
declare var bootbox:any;
declare var $ :any;
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  environmentOptions:any;
  environmentList:any;
  environment:String;
  updatePass:Boolean;
  constructor(private route:Router,private newPassApi:NewPassAPIsService,private routeParams:ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.routeParams.params.subscribe( params =>{
      //console.log(params) 
      if(params.page=="new"){
        this.updatePass=false;
      }
      else{
        this.updatePass=true;
      }
    });
    
    this.environmentOptions=[
      {
      "envName":"Env1",
      "id":1
    },
    {
      "envName":"Env2",
      "id":2
    },
    {
      "envName":"Env3",
      "id":3
    }];
    this.environmentList=
    
     {"envirnoment": "qa",
           "nodes":{ 
             "node1": true,
            "node2": false,
            "node3": false,
            "node4": false
  },
        "newPasswordBean": [
       {
            "userName": "shoban",
            "newPassword": null,
            "oldPassword": "Rahuldemo"
            
        },
     {
            "userName": "Rahul",
            "newPassword": null,
            "oldPassword": "Rahuldemo"            
     },
     {
      "userName": "Sree",
       "newPassword": null,
       "oldPassword": "Rahuldemo"      
}
    ]
        
    };
    this.environment="pleaseSelect";
  }

  saveNewPass(){
    console.log(this.environmentList);
  }

  selectEnv(){
    console.log(this.environment);
  }

  selectAllNode(status){
    if(status==true){
    $.each( this.environmentList.nodes,( key, value )=>{
      this.environmentList.nodes[key]=true;
    });
  }
  else{
    $.each( this.environmentList.nodes,( key, value )=> {
      this.environmentList.nodes[key]=false;
    });
  }    
     
   }
}
