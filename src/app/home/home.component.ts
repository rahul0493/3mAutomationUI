import { Component, OnInit } from '@angular/core';

declare var jquery:any;
declare var bootbox:any;
declare var $ :any;
declare var Chart:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  incident=[{
    "id":"daily",
    "PieData": [
      {
        value    : 7,
        color    : '#f56954',
        highlight: '#f56954',
        label    : 'New'
      },
      {
        value    : 20,
        color    : '#00a65a',
        highlight: '#00a65a',
        label    : 'Opened'
      },
      {
        value    : 12,
        color    : '#f39c12',
        highlight: '#f39c12',
        label    : 'In Progress'
      },
      {
        value    : 16,
        color    : '#00c0ef',
        highlight: '#00c0ef',
        label    : 'Closed'
      }      
    ]
  },
  {
    "id":"weekly",
    "PieData": [
      {
        value    : 25,
        color    : '#f56954',
        highlight: '#f56954',
        label    : 'New'
      },
      {
        value    : 8,
        color    : '#00a65a',
        highlight: '#00a65a',
        label    : 'Opened'
      },
      {
        value    : 3,
        color    : '#f39c12',
        highlight: '#f39c12',
        label    : 'In Progress'
      },
      {
        value    : 11,
        color    : '#00c0ef',
        highlight: '#00c0ef',
        label    : 'Closed'
      }      
    ]
  },
  {
    "id":"monthly",
    "PieData": [
      {
        value    : 60,
        color    : '#f56954',
        highlight: '#f56954',
        label    : 'New'
      },
      {
        value    : 20,
        color    : '#00a65a',
        highlight: '#00a65a',
        label    : 'Opened'
      },
      {
        value    : 15,
        color    : '#f39c12',
        highlight: '#f39c12',
        label    : 'In Progress'
      },
      {
        value    : 5,
        color    : '#00c0ef',
        highlight: '#00c0ef',
        label    : 'Closed'
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
     for(var i=0;i<this.incident.length;i++){
      this.createPieChart(this.incident[i].id,this.incident[i].PieData);
     }
    
  }

}
