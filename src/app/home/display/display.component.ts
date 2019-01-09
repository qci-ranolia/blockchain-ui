import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  @Input() info:any;
  account_display = false;
  share_asset_display = false;
  receive_asset_display = false;
  child_display = false;
  graph1_display = false;
  graph2_display = false;
  heading = "";

  account = [{}];
  shared = "";
  received = "";
  child = "";
  options: any;
  option1: any;

  data =
  {
   "name": "flare",
   "children": [
    {
      "name": "cluster",
      "children": [
       {
         "name": "AgglomerativeCluster", "value": 3938
       }
      ]
    }
   ]
  }

  constructor(private ProjectService: ProjectService) {

    this.account = this.ProjectService.displayDataArray.account;
    this.shared = this.ProjectService.displayDataArray.shared;
    this.received = this.ProjectService.displayDataArray.received;
    this.child = this.ProjectService.displayDataArray.child;

    this.ProjectService.emitHideDisplay.subscribe(res=>{
      console.log(res)
      if(res.display === "false") {
        this.hideAllDisplay();
      }
    })

    this.ProjectService.emitNavData.subscribe(res=>{
      this.ProjectService.getDisplayDataRefresh()
      this.ProjectService.emitDisplayDataFun();
      this.heading = "";
      this.hideAllDisplay();

      this.heading = res.action;

      if(res.display) {

        if(res.display.Account_Display === "true") {
          this.account_display = true;

        } if(res.display.Share_Asset_Display === "true") {
          this.share_asset_display = true;

        } if(res.display.Receive_Asset_Display === "true") {
          this.receive_asset_display = true;

        } if(res.display.Child_Display === "true") {
          this.child_display = true;

        } if(res.display.Graph1_Display === "true") {
          this.graph1_display = true;

        } if(res.display.Graph2_Display === "true") {
          this.graph2_display = true;

        }
      }
    })
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'line';
  public barChartLegend = false;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(255,111,136, 0.47)',
      borderColor: 'rgba(255,76,107, 0.8)',
      pointBackgroundColor: 'rgba(232,62,140,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  hideAllDisplay() {
    this.account_display = false;
    this.share_asset_display = false;
    this.receive_asset_display = false;
    this.child_display = false;
    this.graph1_display = false;
    this.graph2_display = false;
  }

  showAllDisplay() {
    this.account_display = true;
    this.share_asset_display = true;
    this.receive_asset_display = true;
    this.child_display = true;
    this.graph1_display = true;
    this.graph2_display = true;
  }

  ngOnInit() {
    this.ProjectService.getDisplayDataRefresh();

    this.options = {
      tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series:
        [
          {
              type: 'tree',

              data: [this.data],

              left: '2%',
              right: '2%',
              top: '8%',
              bottom: '20%',
              symbol: 'emptyCircle',
              orient: 'vertical',
              expandAndCollapse: true,
              label: {
                  normal: {
                      position: 'top',

                      verticalAlign: 'right',
                      align: 'right',
                      fontSize: 9
                  }
              },
              leaves: {
                  label: {
                      normal: {
                          position: 'bottom',

                          verticalAlign: 'right',
                          align: 'center'
                      }
                  }
              },

              animationDurationUpdate: 750
          }
      ]

    };

    this.option1 = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
      legend: {
          orient: 'vertical',
          x: 'left',
          data:['Self','Others']
      },
      series: [
          {
              name:'asd',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              color: ['#40dc80','#c1c1c1'],
              label: {
                  normal: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      show: true,
                      textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                      }
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data:[
                  {value:335, name:'Self'},
                  {value:210, name:'Others'}
              ]
            }
          ]
      }
    }

}
