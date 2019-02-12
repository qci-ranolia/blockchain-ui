import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../service/ProjectService';
// declare var $
declare var $: any;
import 'datatables.net';
// declare var require: any
// import 'datatables.net-bs4';
// var $  = require( 'jquery' );
// var dt = require( 'datatables.net' )();

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
  f_headers: any = [];
  tempArray: any = [];

  table_view: any;
  show_table: boolean = true;
  loaderView: boolean = false;

  emt1: any;
  emt2: any;

  constructor(private ProjectService: ProjectService) {
    this.ProjectService.emitAssetsNotReceived.subscribe(res=>{
      this.loaderView = true
    })
    this.ProjectService.emitAssetsReceived.subscribe(res=>{
      this.loaderView = false
    })
    this.emt1 = this.ProjectService.emitTable.subscribe(res=>{
      this.f_headers = [];
      this.tempArray = [];

      this.heading = this.ProjectService.globalAction;
      if(this.heading === "Assets"){
        this.isAssets = true;
      }
      else
       this.isAssets = false;

      // console.log(res);
      this.showTable= true;
      // console.log(res)
      this.tableArray= res;

      this.f_headers = res.f_Headers;
      if ( this.f_headers == null ){
        this.show_table = false
      } else this.show_table = true

      this.f_headers = JSON.stringify(this.f_headers);
      let tempArr = JSON.parse(this.f_headers);

      for(let x in tempArr) {
        this.tempArray.push(tempArr[x])
      }
      // console.log(this.tempArray);
    })

    this.emt2 = this.ProjectService.emitHideTable.subscribe(res=>{
      this.showTable = false;
    })

  }

  tableService(m){
    return this.tempArray[m];
  }

  ngOnInit(){
    console.log('init')
  }

  getSummary(i) {
    // console.log(this.tableArray.data[i]);
    this.sIndex = i
    this.ProjectService.getSummary(i);

    if(this.heading==="Receive") {
      if(this.tableArray.data[i].file_name){
        if(this.tableArray.data[i].address){
          this.ProjectService.get_trail(this.tableArray.data[i].address);
        }
      }
    }
    const pos = $('#summary').position().top - 53.5 
    $('html, body').animate({
      scrollTop: pos+'px'
    }, 900);
  }

  dataService(row, m) {
    // console.log(row);
    // console.log(m);
    
    row = JSON.stringify(row);
    let parsed = JSON.parse(row);
    // console.log(parsed)
    
    let arr = [];
    for(let x in parsed){
      // console.log(x)
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
    // console.log(this.ProjectService.navigationData);
    this.ProjectService.createNewFormElements(this.ProjectService.navigationData[2].createForm)
    this.ProjectService.createNewForm();
  }

  ngOnDestroy() {
    this.emt1.unsubscribe();
    this.emt2.unsubscribe();

  }

}