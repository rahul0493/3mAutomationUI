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
    this.resetPassApi.getAllConn()
     .subscribe(res=>{ 
      console.log(res);
      this.connectionList=res;

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
     });  
    
      // });
  }  
  addConnection(){
    this.btnName="Add";

  }

  editConn(id){
    this.btnName="Update";
    this.resetPassApi.getConnById(id)
    .subscribe(res=>{
      this.edit=res;
    })
  }

  updateConn(type){
    console.log(this.edit);
    if(type=="Add"){
    this.resetPassApi.createConn(this.edit)
      .subscribe(res=>{
        this.ngOnInit();
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
      // if(res.n==1){
      //   for(var i=0;i<hosts.length;i++){
      //     if(hosts[i]._id==id){            
      //       hosts.splice(i,1); 
      //       $('#hostDetailsTable').DataTable().destroy();
      //       setTimeout(function(){
      //         $('#hostDetailsTable').DataTable({
      //           responsive: true
      //         });              
      //         }, 50);               
      //       bootbox.alert("<label>Deleted Successfully</label>");
      //     }
      //   }
      // }
      this.ngOnInit();
    })
  }
}

