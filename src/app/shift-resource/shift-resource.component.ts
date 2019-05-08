import { Component, OnInit,AfterViewChecked} from '@angular/core';
import{HomeAPIsService} from '../APIs/home-apis.service';
declare var $ :any;
declare var bootbox:any;

@Component({
  selector: 'app-shift-resource',
  templateUrl: './shift-resource.component.html',
  styleUrls: ['./shift-resource.component.css']
})
export class ShiftResourceComponent implements OnInit {
  month:String;
  selectedMonth:String;
  monthsList:any;
  daysArray:any;
  shiftArray:any; 
  shiftAvail:Boolean;
  
  constructor(private homeApi:HomeAPIsService) { }
  ngOnInit() {   
    //$('body').addClass('sidebar-collapse');
    this.shiftAvail=true;
    console.log(this.shiftArray);
    this.selectedMonth="pleaseSelect";
    this.monthsList=['January', 'February', 'March', 
    'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'];
    this.month=this.monthsList[new Date().getMonth()];
    this.getShiftResourceData(new Date().getMonth()+1,new Date().getFullYear());
    //this.getDaysArray(2019,2);
    
    
    
    $('#monthPicker').datetimepicker({
    	format : "MM-yyyy",
   		autoclose : true,
   		todayBtn : false,
   		startView: "year",
   		minView: 3,
   		maxView: 4,
      pickTime: false,
      showMeridian : false,
       pickerPosition : "bottom-left"      
     }).on('changeDate',(ev)=>{
      this.month=this.monthsList[new Date(ev.date).getMonth()];
      this.getShiftResourceData(new Date(ev.date).getMonth()+1,new Date(ev.date).getFullYear());
  });
     
  }

  
  getDaysArray(month, year) {
    var numDaysInMonth, daysInWeek, daysIndex, index, i, l;
    numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    daysInWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    daysIndex = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
    index = daysIndex[(new Date(year, month - 1, 1)).toString().split(' ')[0]];
    this.daysArray=[];

    for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
        this.daysArray.push({"date":(i + 1),"day":daysInWeek[index++]});
        if (index == 7) index = 0;
    } 
}

getShiftResourceData(month,year){
  this.getDaysArray(month,year);
    this.homeApi.getMonthlyShiftResource(month,year)
    .subscribe((res)=>{
      console.log(res);
      this.shiftArray=res;
      if(res.length>0){
        this.shiftAvail=false;
      }
      else{
        bootbox.alert("No ShiftPlan available for this month");
        this.shiftAvail=true;
      }
    });
}

}
