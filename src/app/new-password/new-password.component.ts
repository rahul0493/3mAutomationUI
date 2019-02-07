import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NewPassAPIsService} from '../APIs/new-pass-apis.service';
import {Router} from '@angular/router';

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
  constructor(private route:Router,private newPassApi:NewPassAPIsService) { }

  ngOnInit() {
    this.environmentOptions=["Env1","Env2","Env3"];
    this.environmentList=
    
     {"envirnoment": "qa",
        "newPasswordBean": [
       {
            "userName": "shoban",
            "newPassword": null,
            "oldPassword": "Rahuldemo",
            "node1": true,
            "node2": false,
            "node3": false,
            "node4": false
        },
     {
            "userName": "Rahul",
            "newPassword": null,
            "oldPassword": "Rahuldemo",
            "node1": false,
            "node2": false,
            "node3": false,
            "node4": false,
     },
     {
      "userName": "Sree",
       "newPassword": null,
       "oldPassword": "Rahuldemo",
       "node1": false,
       "node2": false,
       "node3": false,
       "node4": false,
}
    ]
        
    };
  }

  saveNewPass(){
    console.log(this.environmentList);
  }

}
