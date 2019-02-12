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
  title:String;
  environmentList:any;
  hostDetailsDiv:Boolean;
  environment:String;
  submitBtn:String;
  environmentName:String;
  updatePass:Boolean;
  constructor(private route:Router,private newPassApi:NewPassAPIsService,private routeParams:ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.hostDetailsDiv=false;
    this.routeParams.params.subscribe( params =>{
      //console.log(params) 
      if(params.page=="new"){
        this.updatePass=false;
        this.title="New Password";
      }
      else{
        this.updatePass=true;
        this.title="Change Password";
      }
    });
    
    this.newPassApi.getEnvironmentList()
    .subscribe(res=>{
      console.log(res);
      this.environmentOptions=res;
    })
    
    this.environmentList=[];
    
       
    this.environment="pleaseSelect";
  }

  saveNewPass(){
    console.log(this.environmentList);
    this.newPassApi.savePass(this.environmentList)
    .subscribe(res=>{
      bootbox.alert("Saved Succesfully");
    })
  }

  selectEnv(){
    this.routeParams.params.subscribe( params =>{
      if(params.page=="new"){
        this.newPassApi.readServerFile(this.environment)
    .subscribe(res=>{
      this.environmentList=res;
      console.log(res);
      this.hostDetailsDiv=true;
      this.submitBtn="Save";
      //this.environmentName=env;
    });
      }
      else{
        this.newPassApi.getNewPasswordList(this.environment)
        .subscribe(res=>{
          this.environmentList=res;
          console.log(res);
          this.hostDetailsDiv=true;
          this.submitBtn="Change Server Files";
        });
      }
    });

    
    
  }

  selectAllNode(status){
  //   if(status==true){
  //   $.each( this.environmentList.nodes,( key, value )=>{
  //     this.environmentList.nodes[key]=true;
  //   });
  // }
  // else{
  //   $.each( this.environmentList.nodes,( key, value )=> {
  //     this.environmentList.nodes[key]=false;
  //   });
  // }    

  if(status==true){
    this.environmentList.node1=true;
    this.environmentList.node2=true;
    this.environmentList.node3=true;
    this.environmentList.node4=true;
  }
  else{
    this.environmentList.node1=false;
    this.environmentList.node2=false;
    this.environmentList.node3=false;
    this.environmentList.node4=false;
  }
     
   }
}
