import { Component, OnInit,AfterViewInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { HomeAPIsService } from '../APIs/home-apis.service';


declare var jquery:any;
declare var bootbox:any;
declare var $ :any;
declare var Chart:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[]
})

export class HomeComponent implements OnInit {

  ngAfterViewInit(){    
  }
date:String;
upcomingEvent:any;
todayEvent:any;
noEventToday:String;
noUpcomingEvent:String;
dailyShiftArr:any;
trackList:any;

  constructor(private router:Router,private homeServ:HomeAPIsService) { }
  incident=[{
    "id":"daily",
    "PieData": [
      {
        value    : 21,
        color    : '#f56954',
        highlight: '#f56954',
        label    : 'Opened'
      },    
     
      {
        value    : 5,
        color    : '#00a65a',
        highlight: '#00a65a',
        label    : 'Work in Progress'
      },
      {
        value    : 12,
        color    : '#f39c12',
        highlight: '#f39c12',
        label    : 'Pending Vendor'
      },
      {
        value    : 16,
        color    : '#00c0ef',
        highlight: '#00c0ef',
        label    : 'Pending Client'
      } ,      
     
      {
        value    : 4,
        color    : '#5e5e5f ',
        highlight: '#5e5e5f ',
        label    : 'Redirected'
      },
      {
        value    : 9,
        color    : '#3c8dbc ',
        highlight: '#3c8dbc ',
        label    : 'Resolved'
      }
    ]
  },
  {
    "id":"weekly",
    "PieData": [
      {
        value    : 15,
        color    : '#f56954',
        highlight: '#f56954',
        label    : 'Opened'
      },    
     
      {
        value    : 20,
        color    : '#00a65a',
        highlight: '#00a65a',
        label    : 'Work in Progress'
      },
      {
        value    : 12,
        color    : '#f39c12',
        highlight: '#f39c12',
        label    : 'Pending Vendor'
      },
      {
        value    : 3,
        color    : '#00c0ef',
        highlight: '#00c0ef',
        label    : 'Pending Client'
      } ,
      {
        value    : 7,
        color    : '#5e5e5f ',
        highlight: '#5e5e5f ',
        label    : 'Redirected'
      },
      {
        value    : 25,
        color    : '#3c8dbc ',
        highlight: '#3c8dbc ',
        label    : 'Resolved'
      }    
      
    ]
  },
  {
    "id":"monthly",
    "PieData": [
      {
        value    : 5,
        color    : '#f56954',
        highlight: '#f56954',
        label    : 'Opened'
      },    
     
      {
        value    : 12,
        color    : '#00a65a',
        highlight: '#00a65a',
        label    : 'Work in Progress'
      },
      {
        value    : 17,
        color    : '#f39c12',
        highlight: '#f39c12',
        label    : 'Pending Vendor'
      },
      {
        value    : 23,
        color    : '#00c0ef',
        highlight: '#00c0ef',
        label    : 'Pending Client'
      } ,
      {
        value    : 6,
        color    : '#5e5e5f ',
        highlight: '#5e5e5f ',
        label    : 'Redirected'
      },
      {
        value    : 10,
        color    : '#3c8dbc ',
        highlight: '#3c8dbc ',
        label    : 'Resolved'
      }    
      
    ]
  }  
]
   

  createPieChart(id,PieData){

    var pieChartCanvas = $('#'+id).get(0).getContext('2d');
    var pieChart       = new Chart(pieChartCanvas);
   
    var pieOptions     = {
      // Boolean - Whether we should show a stroke on each segment
      segmentShowStroke    : true,
      // String - The colour of each segment stroke
      segmentStrokeColor   : '#fff',
      // Number - The width of each segment stroke
      segmentStrokeWidth   : 1,
      // Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout: 50, // This is 0 for Pie charts
      // Number - Amount of animation steps
      animationSteps       : 100,
      // String - Animation easing effect
      animationEasing      : 'easeOutBounce',
      // Boolean - Whether we animate the rotation of the Doughnut
      animateRotate        : true,
      // Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale         : true,
      // Boolean - whether to make the chart responsive to window resizing
      responsive           : true,
      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio  : false,
      // String - A legend template
      legendTemplate       : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<segments.length; i++){%><li><span style=\'background-color:<%=segments[i].fillColor%>\'></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
      // String - A tooltip template
      tooltipTemplate      : '<%=value %> <%=label%>',
    };
    // Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    pieChart.Pie(PieData, pieOptions);
  }
  ngOnInit() {
      this.homeServ.getUpcomingEvent()
      .subscribe(res=>{
        if(res.todayEvent.length==0){
          this.noEventToday="Today No Event !!";
        }
        if(res.upcomingEvent.length==0){
        this.noUpcomingEvent="Upcoming No Event !!";
        }
        this.todayEvent=res.todayEvent;
        this.upcomingEvent=res.upcomingEvent;
      });

    this.homeServ.getDailyShiftResource()
    .subscribe((res)=>{
      console.log(res);
      this.sortAsscending(res);      
      this.dailyShiftArr=res;
      //this.sortAsscending(res[0].trackList); 
      this.trackList=res[0].trackList;
    })
          
    this.date=formatDate(new Date(), 'dd MMM, yyyy.', 'en-US', '+0530');
    setTimeout(()=>{
     for(var i=0;i<this.incident.length;i++){
      this.createPieChart(this.incident[i].id,this.incident[i].PieData);
     }
    },100);
  }

  sortAsscending(data){
    data.sort(function(a, b){
      var nameA=a.shiftName.toLowerCase(), nameB=b.shiftName.toLowerCase()
      if (nameA < nameB) //sort string ascending
          return -1 
      if (nameA > nameB)
          return 1
      return 0 //default return value (no sorting)
  })
  }
}
