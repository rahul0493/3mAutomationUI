import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import {HostDetailAPIsService} from '../APIs/host-detail-apis.service';


import {Router} from '@angular/router';

declare var jquery:any;
declare var bootbox:any;
declare var $ :any;
@Component({
  selector: 'app-host-details',
  templateUrl: './host-details.component.html',
  styleUrls: ['./host-details.component.css']
})
export class HostDetailsComponent implements OnInit {

evironmentList=[];
edit={};
submitted = false;
btnName:String;
loading = false;
hostForm: FormGroup;
public visibility: boolean = false;
  constructor(private router:Router,private hostApi:HostDetailAPIsService, private formBuilder: FormBuilder) { }
  
  ngOnInit() {

    this.evironmentList=[];
  //   this.hostForm = this.formBuilder.group({
  //     environmentName: ['', Validators.required]
      
  // });
   
    
     this.hostApi.getEnvironmentList()
     .subscribe(res=>{   
       this.evironmentList=res;
    $('table').DataTable().destroy();
      setTimeout(function(){
        $('table').DataTable({
          responsive: true
        }); 
        $('table tr td input[type="text"]').attr('disabled',true);
        }, 50); 
       });
  }
 
     

  get f() { return this.hostForm.controls; }
  rowCheck(id){
   // alert(id);    
    $('#tr'+id+' td input[type="text"]').prop('disabled', function(i, v) { return !v; });
    if($('#tr'+id+' .saveBtn').attr('hidden')){
      $('#tr'+id+' .saveBtn').removeAttr('hidden');
    }
    else{
      $('#tr'+id+' .saveBtn').attr('hidden',true);
    }
  }


  // onCreate(){
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.hostForm.invalid) {
  //       return;
  //   }
  //   this.loading = true;
  // }


  addEnvironment(){
     this.btnName="Add";    
  }
  createEnvironment(data){
    console.log(data);
    this.hostApi.createEnvironment(data)
    .subscribe(res=>{
      this.ngOnInit();
        bootbox.alert('<label>Created Succesfully</label>');   
     })
  }

  addNewHost(id,index){   
    this.evironmentList[index].hostDetailBeans.push({"hostName":"","password":"","hostDirectory":"","localDirectory":"","node":"","environmentId":"","id":null});     
    $('#hostDetailsTable'+id).DataTable().destroy();   
      setTimeout(function(){
        $('#hostDetailsTable'+id).DataTable({
          responsive: true 
          //lengthMenu: [[10,10, 25, 50, -1], [5,10, 25, 50, "All"]]                               
      });  
      $('#hostDetailsTable'+id+' #tr .saveBtn').removeAttr('hidden');
      }, 50);  
      console.log(this.evironmentList);
  }

  createNode(id,data,envId){   
    if(id==null||id==undefined){
      data.environmentId=envId;
      console.log(data);
      this.hostApi.createHost(data)
     .subscribe(res=>{
         bootbox.alert('<label>Created Succesfully</label>');   
         this.ngOnInit();
      })
    }
    else{
      this.hostApi.createHost(data)
       .subscribe(res=>{
        bootbox.alert('<label>Updated Succesfully</label>');   
        this.ngOnInit();
       })
    }
    console.log(data);
  }

  deleteNode(index,data,index1,id,name){
    if(id==undefined){      
      this.evironmentList[index].hostDetailBeans.splice(index1,1); 
      $('#hostDetailsTable'+name).DataTable().destroy();   
      setTimeout(function(){
        $('#hostDetailsTable'+name).DataTable({
          responsive: true                                       
      });  
      $('#hostDetailsTable'+name+' #tr .saveBtn').removeAttr('hidden');
      }, 50);  
      console.log(this.evironmentList);
    }
    else{
    bootbox.confirm("<label>Are you sure, you want to delete?</label>",(result)=>{
           if(result==true){          
            this.hostApi.deleteHostById(id)
            .subscribe(res=>{
              bootbox.alert('<label>Deleted Succesfully</label>'); 
              this.evironmentList[index].hostDetailBeans.splice(index1,1); 
      $('#hostDetailsTable'+name).DataTable().destroy();   
      setTimeout(function(){
        $('#hostDetailsTable'+name).DataTable({
          responsive: true                                       
      });  
      $('#hostDetailsTable'+name+' #tr .saveBtn').removeAttr('hidden');
      }, 50);  
      console.log(this.evironmentList);  
            })       
         }   
      });  
    }  
  }


  // editHost(id){
  //   this.btnName="Update";
  //   this.hostApi.getHostById(id)
  //   .subscribe(res=>{
  //     this.edit=res[0];
  //   })
  // }

  // updateHost(type){
  //   console.log(this.edit);
  //   if(type=="Add"){
  //     this.hostApi.createHost(this.edit)
  //     .subscribe(res=>{
  //       this.ngOnInit();
  //       bootbox.alert('<label>Created Succesfully</label>');   
  //     })
  //   }
  //   else{
  //     this.hostApi.updateHost(this.edit)
  //     .subscribe(res=>{
  //       this.ngOnInit();
  //     })
  //   }
  //   $('#modalClose').click();
  //   this.edit={};
  // }

  // deleteHost(id:any){
  //   var hosts=this.hostList;
  //   bootbox.confirm("<label>Are you sure, you want to delete?</label>",(result)=>{
  //     if(result==true){          
  //       this.deleteFunction(hosts,id);
  //     }   
  //   });    
  // }

  // deleteFunction(hosts,id){
  //   this.hostApi.deleteHostById(id)
  //         .subscribe(res=>{
  //     if(res.n==1){
  //       for(var i=0;i<hosts.length;i++){
  //         if(hosts[i]._id==id){            
  //           hosts.splice(i,1); 
  //           $('#hostDetailsTable').DataTable().destroy();
  //           setTimeout(function(){
  //             $('#hostDetailsTable').DataTable({
  //               responsive: true
  //             });              
  //             }, 50);               
  //           bootbox.alert("<label>Deleted Successfully</label>");
  //         }
  //       }
  //     }
  //   })
  // }
  


}
