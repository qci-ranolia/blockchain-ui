import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() info:any;
  header: any = [];
  data: any;
  arr: any = [];
  showSummary= false;
  showViewAll= false;
  shareWithAddress = false;
  shareWithAddressData : any;
  trail_view= false;
  options= {};
  trail_data = [];
  f_headers: any = [];
  tempArray: any = [];

  constructor(private ProjectService: ProjectService) {
    trail_view: false;
    this.ProjectService.emitSummary.subscribe(res=>{
      this.showViewAll= false;
      this.shareWithAddress = false;
      this.header = [];
      this.data = [];
      this.arr = [];
      // console.log(res);
      this.showSummary = true;
      this.header = res.header;
      this.data = res.data;
      // json to array
      this.data = JSON.stringify(this.data);
      let parsed = JSON.parse(this.data);

      for(let x in parsed){
        this.arr.push(parsed[x]);
      }
      // console.log(this.header);
      // console.log(this.data);
      // console.log(this.arr);

      let action = this.ProjectService.globalAction;

      if(this.ProjectService.globalAction === "Accounts" ) {
        this.showViewAll= true;
      }
      if(this.ProjectService.globalAction === "Receive" ) {
        console.log(res);

        if(res.data) {

          if(res.data.shared_assets_count) {

            if(res.data.shared_assets_count>0) {
              this.showViewAll= true;
            }
          }
        }

        let tempData =  JSON.parse(this.data);
        if(tempData.to_org_address) {
          this.showViewAll= false;
        }
      }
      if(action === "Assets") {
        this.shareWithAddress= true;
        let tempData =  JSON.parse(this.data);
        if(tempData.address) {
          console.log(tempData.address)
          this.shareWithAddressData = tempData.address;
        }
      }

      this.f_headers = res.f_Headers;
      console.log(this.f_headers);

      this.f_headers = JSON.stringify(this.f_headers);
      let tempArr = JSON.parse(this.f_headers);

      for(let x in tempArr) {
        this.tempArray.push(tempArr[x])
      }

      console.log(this.tempArray);

    })

    this.ProjectService.emitHideSummary.subscribe(res=>{
      this.showSummary = false;
      this.trail_view= false;
    });

    this.ProjectService.emitTrailView.subscribe(res=>{
      this.trail_view = true;
      this.trail_data = res;
      console.log(this.trail_data);
      // console.log(this.data1);
      // this.displayTrailView(trail_data);
    })

  }

  ngOnInit() {

  }

  viewAll() {
    if(this.ProjectService.globalAction === "Accounts") {
      let temp = JSON.parse(this.data)
      this.ProjectService.viewAll(temp.email);
    }

    if(this.ProjectService.globalAction === "Receive") {
      let tempData =  JSON.parse(this.data);
      if(tempData.address) {
        console.log(tempData.address)
        this.ProjectService.viewAllReceiveAssets(tempData.address);
      }
    }
  }

  tableService(m) {
    return this.tempArray[m];
  }

  dataService(m) {
    // console.log(m);
    // console.log(this.arr[m]);
    return this.arr[m];
  }

  // only in share assets
  createNewShareForm() {

    this.ProjectService.createNewFormElements(this.ProjectService.navigationData[1].createForm2);
    this.ProjectService.createNewForm();
  }

  displayTrailView(trail_data) {
    this.options = {
      tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series:
        [
          {
            type: 'tree',

            data: [trail_data],

            left: '2%',
            right: '2%',
            top: '8%',
            orient: 'vertical',
            expandAndCollapse: true,
            leaves: {
                label: {
                    normal: {
                        position: 'bottom',
                        verticalAlign: 'center',
                        align: 'center'
                    }
                }
            },

            symbolSize: 12,
            label: {
              normal: {
                position: 'center',
                verticalAlign: 'center',
                align: 'center',
                fontSize: 12
              }
            },
            itemStyle:{
              color:'#ff4ca6',
              borderColor:'#ff4ca6'
            },
            lineStyle:{
              color:'#ff4ca6',
              curveness:0.9
            },/*
            tooltip:{
              backgroundColor:'rgba(0,0,0,0.7)',
              borderColor:'#000'
            }, */
            animationDurationUpdate: 750
          }
      ]

    };
  }

}
