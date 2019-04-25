import { Component, OnInit } from '@angular/core';
import { HomeAPIsService } from '../APIs/home-apis.service';

declare var $ :any;
declare var bootbox:any;
@Component({
  selector: 'app-event-report',
  templateUrl: './event-report.component.html',
  styleUrls: ['./event-report.component.css']
})
export class EventReportComponent implements OnInit {
btnName:String;
event:any;
allEventArr:any;
  constructor(private homeServ:HomeAPIsService) { }

  ngOnInit() {
    this.event={};
    this.homeServ.getAllEvent()
    .subscribe(res=>{
      this.allEventArr=res;
    });
  }

  addEvent(){
    console.log('create');
    this.event={};
    this.btnName="Create";
  }

  editEvent(data){
    this.btnName="Update"
    $('#myModal').modal('show');
    this.event=data;
  }

  createEvent(data){
    if(data.id==null||data.id==undefined){
      this.homeServ.createNewEvent(data)
    .subscribe(res=>{
      $('#myModal').modal('hide');
      bootbox.alert('Created Successfully');
      this.ngOnInit();
    });
    }
    else{
      this.homeServ.updateEvent(data)
      .subscribe(res=>{
        $('#myModal').modal('hide');
        bootbox.alert('Updated Successfully');
        this.ngOnInit();
      });
    }
  
    
  }

  deleteEvent(id){
    bootbox.confirm("Are you sure, you want to delete?",(result)=>{
      if(result==true){          
          this.homeServ.deleteEvent(id)
          .subscribe(res=>{
              bootbox.alert('Deleted Successfully');
              this.ngOnInit();
          });       
    }   
 }); 
  }

}
