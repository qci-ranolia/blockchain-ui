import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../service/ProjectService';
declare var $

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() info:any;
  tableArray: any;
  showTable= false;
  sIndex: number = null;
  heading: any = "";
  isAssets: any = false;

  constructor(private ProjectService: ProjectService) {

    this.ProjectService.emitTable.subscribe(res=>{
      this.heading = this.ProjectService.globalAction;
      if(this.heading === "Assets")
        this.isAssets = true;
      else
       this.isAssets = false;
      console.log(res);
      this.showTable= true;
      this.tableArray= res;
    })
    this.ProjectService.emitHideTable.subscribe(res=>{
      this.showTable = false;
    })
  }

  ngOnInit() {
  }

  getSummary(i) {
    this.sIndex = i
    this.ProjectService.getSummary(i)
  }

  dataService(row, m) {
    // console.log(i);
    row = JSON.stringify(row);
    let parsed = JSON.parse(row);

    let arr = [];

    for(let x in parsed){
      arr.push(parsed[x]);
    }
    // console.log(arr);
    return arr[m];
  }

  createNew() {
    this.ProjectService.createNewForm();
  }

  // only in share assets
  createNewIssueForm() {
    // console.log(this.ProjectService.navigationData[1].createForm)
    this.ProjectService.createNewFormElements(this.ProjectService.navigationData[1].createForm)
    this.ProjectService.createNewForm();
  }

}
