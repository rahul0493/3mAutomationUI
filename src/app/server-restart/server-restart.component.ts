import { Component, OnInit } from '@angular/core';
import {NewPassAPIsService} from '../APIs/new-pass-apis.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-server-restart',
  templateUrl: './server-restart.component.html',
  styleUrls: ['./server-restart.component.css']
})
export class ServerRestartComponent implements OnInit {
  serverRestartDetailsDiv:boolean;
  environmentOptions:any;
  title:String;
  environment:String;
  environmentList:any;
  
  constructor(private router:Router,private newPassApi:NewPassAPIsService) { }

  ngOnInit() {
    this.serverRestartDetailsDiv=true;
    this.title="App Restart";    
    this.newPassApi.getEnvironmentList()
    .subscribe(res=>{
      console.log(res);
      this.environmentOptions=res;
      this.environment="pleaseSelect";
    })
    this.environmentList=[];
  }

}
