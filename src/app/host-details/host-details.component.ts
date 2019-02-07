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
hostList=[];
evironmentList=[];
edit={};
submitted = false;
btnName:String;
loading = false;
hostForm: FormGroup;
  constructor(private router:Router,private hostApi:HostDetailAPIsService, private formBuilder: FormBuilder,) { }

  // openAllPanels(aId) {
  //   console.log("setAllPanelOpen");
  //   $(aId + ' .panel-collapse:not(".in")').collapse('show');
  // }
  // closeAllPanels(aId) {
  //   console.log("setAllPanelclose");
  //   $(aId + ' .panel-collapse.in').collapse('hide');
  // }
  
  ngOnInit() {
    // $(".toggle-accordion").on("click", function() {
    //   var accordionId = $(this).attr("accordion-id"),
    //     numPanelOpen = $(accordionId + ' .collapse.in').length;
      
    //   $(this).toggleClass("active");
  
    //   if (numPanelOpen == 0) {
    //     this.openAllPanels(accordionId);
    //   } else {
    //     this.closeAllPanels(accordionId);
    //   }
    // })

    this.evironmentList=[
      {
          "id": 34,
          "environment": "QA",
          "hostDetailBeans": [
              {
                  "id": 35,
                  "environmentId":34,
                  "node": "node2",
                  "hostName": "uspngg001a@nggappqa02.mmm.com",
                  "password": "F1rewallchanges",
                  "hostDirectory": "/opt/sterling/3M_stuff/node2_test/automation_test/properties/jdbc_customer.properties.in",
                  "localDirectory": "C:/Users/Rahuly/Desktop/conf/qa/jdbc_customer.properties.in"
              },
              {
                "id": 36,
                "environmentId":34,
                "node": "node1",
                "hostName": "uspngg001a@nggappqa02.mmm.com",
                "password": "F1rewallchanges",
                "hostDirectory": "/opt/sterling/3M_stuff/node2_test/automation_test/properties/jdbc_customer.properties.in",
                "localDirectory": "C:/Users/Rahuly/Desktop/conf/qa/jdbc_customer.properties.in"
            },
            {
              "id": 37,
              "environmentId":34,
              "node": "node2",
              "hostName": "uspngg001a@nggappqa02.mmm.com",
              "password": "F1rewallchanges",
              "hostDirectory": "/opt/sterling/3M_stuff/node2_test/automation_test/properties/jdbc_customer.properties.in",
              "localDirectory": "C:/Users/Rahuly/Desktop/conf/qa/jdbc_customer.properties.in"
          }
          ]
      },
      {
        "id": 38,
        "environment": "Prod",
        "hostDetailBeans": [
            {
                "id": 39,
                "environmentId":38,
                "node": "node2",
                "hostName": "uspngg001a@nggappqa02.mmm.com",
                "password": "F1rewallchanges",
                "hostDirectory": "/opt/sterling/3M_stuff/node2_test/automation_test/properties/jdbc_customer.properties.in",
                "localDirectory": "C:/Users/Rahuly/Desktop/conf/qa/jdbc_customer.properties.in"
            },
            {
              "id": 40,
              "environmentId":38,
              "node": "node1",
              "hostName": "uspngg001a@nggappqa02.mmm.com",
              "password": "F1rewallchanges",
              "hostDirectory": "/opt/sterling/3M_stuff/node2_test/automation_test/properties/jdbc_customer.properties.in",
              "localDirectory": "C:/Users/Rahuly/Desktop/conf/qa/jdbc_customer.properties.in"
          },
          {
            "id": 41,
            "environmentId":38,
            "node": "node2",
            "hostName": "uspngg001a@nggappqa02.mmm.com",
            "password": "F1rewallchanges",
            "hostDirectory": "/opt/sterling/3M_stuff/node2_test/automation_test/properties/jdbc_customer.properties.in",
            "localDirectory": "C:/Users/Rahuly/Desktop/conf/qa/jdbc_customer.properties.in"
        }
        ]
    }
  ] ;
    this.hostForm = this.formBuilder.group({
      environmentName: ['', Validators.required]
      
  });
  const arr=[];
    this.hostList=[];
    
    // this.hostApi.getAllHost()
    // .subscribe(res=>{    
    $('table').DataTable().destroy();
      setTimeout(function(){
        $('table').DataTable({
          responsive: true
        }); 
        $('table tr td input[type="text"]').attr('disabled',true);
        }, 50); 
      // }); 
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


  onCreate(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.hostForm.invalid) {
        return;
    }
    this.loading = true;
  }


  addEnvironment(){
     this.btnName="Add";    
  }

  addNewHost(id,index){   
    this.evironmentList[index].hostDetailBeans.push({"hostName":"","password":"","hostDirectory":"","localDirectory":"","node":"","environmentId":""});     
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
    if(id==undefined){
      data.environmentId=envId;
      this.hostApi.createHost(this.edit)
     .subscribe(res=>{
       this.ngOnInit();
         bootbox.alert('<label>Created Succesfully</label>');   
      })
    }
    else{
      this.hostApi.updateHost(this.edit)
       .subscribe(res=>{
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
            alert(id);                     
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
