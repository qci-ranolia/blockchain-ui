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
  account = [];
  shared = "";
  received = "";
  child = "";
  options: any;
  option1: any;
  option2: any;
  assets_Count1:any;
  assets_Count2:any;
  received_Count1:any;
  received_Count2:any;
  received_graph:{};
  showRefresh:any;
  chartJSColor = [
    { // grey
      backgroundColor: 'rgba(255,111,136, 0.47)',
      borderColor: 'rgba(255,76,107, 0.8)',
      pointBackgroundColor: 'rgba(232,62,140,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'pink',
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

  data =
  {
   "name": "The Agricultural and Processed Food Products",
   "children": [
    {
      "name": "The Agricultural and Processed         Food Products Export Development",
      "children": [
       {
         "name": "Quality council of India", "value": 3938
       }
      ]
    }
   ]
  }

  constructor(private ProjectService: ProjectService) {

    // this.received_graph = {
    //   barChartOptions : {
    //     scaleShowVerticalLines: false,
    //     responsive: true,
    //   },
    //   barChartLabels : this.ProjectService.displayDataArray.received.chart_Label,
    //   barChartType : 'line',
    //   barChartLegend : false,
    //   barChartData : [
    //     {data: this.ProjectService.displayDataArray.received.chart_Data, label: 'Received'}
    //   ],
    //   lineChartColors : this.chartJSColor
    //
    // }

    console.log(this.ProjectService.displayDataArray.data)

    if(!this.ProjectService.displayDataArray.data) {

    } else {

      if(this.ProjectService.displayDataArray.data.accounts) {

        if(this.ProjectService.displayDataArray.data.accounts.length>0) {
          this.account = this.ProjectService.displayDataArray.data.accounts;
        }
      }

      this.shared = this.ProjectService.displayDataArray.data.assets.count+"";
      this.assets_Count1 = this.ProjectService.displayDataArray.data.assets.self+"";
      this.assets_Count2 = this.ProjectService.displayDataArray.data.assets.other+"";
      this.received = this.ProjectService.displayDataArray.data.received.count+"";
      this.received_Count1 = this.ProjectService.displayDataArray.data.received.received_assets_count+"";
      this.received_Count2 = this.ProjectService.displayDataArray.data.received.receive_address_count+"";
      this.child = this.ProjectService.displayDataArray.data.child_count+"";

    }


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
              symbol: 'emptyCircle',
              orient: 'vertical',
              expandAndCollapse: true,
              leaves: {
                  label: {
                      normal: {
                          position: 'bottom',

                          verticalAlign: 'right',
                          align: 'center'
                      }
                  }
              },

              symbolSize: 10,
              label: {
                normal: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right',
                  fontSize: 13
                }
              },
              itemStyle:{
                color:'#7C90DB',
                borderColor:'#7C90DB'
              },
              lineStyle:{
                color:'#ffa02c',
                curveness:0.6
              },/*
              tooltip:{
                backgroundColor:'rgba(0,0,0,0.7)',
                borderColor:'#000'
              }, */
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
          // orient: 'vertical',
          // x: 'left',
          bottom: -2,
          left: 'center',
          data: ['Self','Others']
      },
      series: [
          {
              name:'Shared',
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
                  {value:this.assets_Count1, name:'Self'},
                  {value:this.assets_Count2, name:'Others'}
              ]
            }
          ]
      }


    this.option2 = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
          // orient: 'vertical',
          // x: 'left',
          bottom: -2,
          left: 'center',
          data: ['Self','Others']
      },
      series: [
          {
              name:'Received',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              color: ['#ff4c6a','#c1c1c1'],
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
                {value:this.received_Count1, name:'Self'},
                {value:this.received_Count2, name:'Others'}
            ]
            }
          ]
      }
    }
}
