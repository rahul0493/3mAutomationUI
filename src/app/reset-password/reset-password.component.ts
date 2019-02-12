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
    this.btnName="Add";
     this.resetPassApi.getAllConn()
     .subscribe(res=>{  
     this.connectionList=res;
    $('#connDetailsTable').DataTable().destroy();
      setTimeout(function(){
        $('#connDetailsTable').DataTable({
          responsive: true
        });   
        }, 50);  
  });
}
resetPass(id,data){
  if(data.newPassword==data.confirmPassword){
   this.resetPassApi.updateConn(data)
   .subscribe(res=>{  
    
     this.resetPassApi.resetPassword(data)
     .subscribe(res=>{
       alert(res);
       this.ngOnInit();
     })
});
}else{
  alert('password not matched')

}
}
checkStatus(id){
  this.resetPassApi.checkStatusById(id)
  .subscribe(res=>{
    alert(res);
    
  })
}
}
