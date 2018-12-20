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

  constructor(private ProjectService: ProjectService) {
    this.ProjectService.emitSummary.subscribe(res=>{

      if(this.ProjectService.globalAction === "Accounts" ) {
        this.showViewAll= true;
      }

      this.header = [];
      this.data = [];
      this.arr = [];
      console.log(res);
      this.showSummary = true;
      this.header = res.header;
      this.data = res.data;
      // json to array
      this.data = JSON.stringify(this.data);
      let parsed = JSON.parse(this.data);

      for(let x in parsed){
        this.arr.push(parsed[x]);
      }
    })

    this.ProjectService.emitHideSummary.subscribe(res=>{
      this.showSummary = false;
    });
  }

  ngOnInit() {

  }

  viewAll() {
    let temp = JSON.parse(this.data)
    console.log(temp.email)
    this.ProjectService.viewAll(temp.email);
  }

  dataService(m) {
    // console.log(i);
    // console.log(arr);
    return this.arr[m];
  }

}
