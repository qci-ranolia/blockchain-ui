import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() info:any;
  tableArray: any;
  showTable= false;

  constructor(private ProjectService: ProjectService) {
    this.ProjectService.emitTable.subscribe(res=>{
      console.log(res);
      this.showTable= true;
      this.tableArray= res;
    })

    this.ProjectService.emitHideTable.subscribe(res=>{
      this.showTable = false;
    });
  }

  ngOnInit() {
  }

  getSummary(i) {
    this.ProjectService.getSummary(i);
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

}
