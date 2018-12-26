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


  constructor(private ProjectService: ProjectService) {
    this.ProjectService.emitSummary.subscribe(res=>{

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
        this.showViewAll= true;
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
        if(tempData.to_org_address) {
          this.showViewAll= false;
        }
      }

    })

    this.ProjectService.emitHideSummary.subscribe(res=>{
      this.showSummary = false;
    });
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

}
