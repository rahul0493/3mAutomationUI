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
  msg= String;
  constructor(private router:Router,private resetPassApi:ResetPassAPIsService) { }

  ngOnInit() {
    console.log('ghj');
    this.btnName="Add";
     this.resetPassApi.getAllConn()
     .subscribe(res=>{  
     this.connectionList=res;
    $('#connDetailsTable').DataTable().destroy();
      setTimeout(function(){
        $('#connDetailsTable').DataTable({
          responsive: true,
          stateSave: true
        });   
        }, 50);  
  });
}
resetPass(id,data,arr){
  if(data.newPassword==data.confirmPassword){
   this.resetPassApi.updateConn(data)
   .subscribe(res=>{  
    
     this.resetPassApi.resetPassword(data)
     .subscribe(res=>{
      //var resAdmin = arr.find(x => x.id === id);
      // arr.splice(arr.indexOf(id), 1);
      // console.log(arr);
      // arr[id]=data;
      //resAdmin.currentPassword=data.currentPassword;
      bootbox.alert("Password Resetted Successfully");
      this.ngOnInit();
     })
});
}else{
  bootbox.alert('Password not Matched')

}
}
checkStatus(id){
  this.resetPassApi.checkStatusById(id)
  .subscribe(res=>{
    bootbox.alert(res);
    
  })
}
}
