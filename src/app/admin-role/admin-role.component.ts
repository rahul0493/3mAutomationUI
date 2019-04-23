import { Component, OnInit } from '@angular/core';
import {UserRoleService} from '../APIs/user-role.service';


declare var bootbox:any;
declare var $ :any;

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css']
})


export class AdminRoleComponent implements OnInit {
  userRoleArr:any;
  constructor(private userRoleServ:UserRoleService) { }

  ngOnInit() {
    this.userRoleServ.getAllEmp()
    .subscribe((res)=>{
      console.log(res);
      this.userRoleArr=res;
      $('#roleTable').DataTable().destroy();
      setTimeout(function(){
        $('#roleTable').DataTable({
          responsive: true
        });   
      }, 50);  
    }); 
  }

  
  roleCheck (id) {
    if ($(".enableRole").is(':checked')) {
        $('#submitRole input').removeClass('hidden');
        $('#submitRole input').attr('disabled', false);
    } else {
        $('#submitRole input').addClass('hidden');
        $('#submitRole input').attr('disabled', true);
    }

    var disable = $('#roleTable #row' + id + ' .roleCheck').attr('disabled');
    if (disable == 'disabled') {
        $('#roleTable #row' + id + ' .roleCheck').attr("disabled", false);
        //$('#submitRole input').attr('disabled',false);
    } else {
        $('#roleTable #row' + id + ' .roleCheck').attr("disabled", true);
        //$('#submitRole input').attr('disabled',true);
    }
}

updateUserRole(){
  var arrr = [];
  var data=this.userRoleArr;
  $("input[class=enableRole]:checked").each(function() {
      var id = $(this).attr("id");      
      var res=data.find(x => x.empCode === id);     
      arrr.push(res);
  });
 
  this.userRoleServ.updateUserRole(arrr).
  subscribe((res)=>{
    console.log(JSON.stringify(res));
    this.ngOnInit();
    $('#submitRole input').addClass('hidden');
  
    bootbox.alert("<label>Updated Succesfully</label>");
  })
}

}
