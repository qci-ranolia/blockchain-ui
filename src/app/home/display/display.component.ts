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

  data =
  {
   "name": "flare",
   "children": [
    {
      "name": "cluster",
      "children": [
       {"name": "AgglomerativeCluster", "value": 3938}
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
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
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
  }

}
