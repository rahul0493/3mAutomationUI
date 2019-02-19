import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DbConnectionService} from '../APIs/db-connection.service';
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
  constructor(private router:Router,private dbConnApi:DbConnectionService) { }

  ngOnInit() {
    this.btnName="Add";
    this.dbConnApi.getAllConn()
         .subscribe(res=>{ 
      console.log(res);
      this.connectionList=res;

      $('#connDetailsTable').DataTable().destroy();
      setTimeout(function(){
        $('#connDetailsTable').DataTable({
          responsive: true,
        //   dom: 'lBfrtip',
        //   buttons: [
        //     {
        //         text: '<i class="fa fa-plus-circle"> Add New</i>',
        //         action: ( e, dt, node, config ) =>{                                      
        //             $('#myModal').modal('toggle');   
        //             this.btnName="Add";
        //             this.edit={};                        
        //         }
        //     }
        // ]
        });   
        $('.dt-buttons a').removeClass('dt-button').addClass('btn btn-success btn-sm'); 
        $('.dt-buttons').css('padding-left','20px')  ;
        }, 50);  
     });  
    
      // });
  }  
  addConnection(){
    this.btnName="Add";
    this.edit={};
  }

  editConn(id){
    this.btnName="Update";
    this.dbConnApi.getConnById(id)
    .subscribe(res=>{
      this.edit=res;
    })
  }

  updateConn(type){
    console.log(this.edit);
    if(type=="Add"){
    this.dbConnApi.createConn(this.edit)
      .subscribe(res=>{
        this.ngOnInit();
      })
     
    }
    else{
      this.dbConnApi.updateConn(this.edit)
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
    this.dbConnApi.deleteConnById(id)
          .subscribe(res=>{

      this.ngOnInit();
    })
  }
}

