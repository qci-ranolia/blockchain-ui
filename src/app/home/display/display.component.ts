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
  startUX : any;

  constructor(private ProjectService: ProjectService) {
    this.account = [
      { "total" : "5,72,172", "name" : "Master accounts", "per1": "50", "per2" : "50" },
      { "total" : "10,08,258", "name" : "Lab accounts", "per1" : "100", "per2" : "100" },
      { "total" : "7,12,440", "name" : "User accounts", "per1" : "75", "per2" : "25" },
      { "total" : "2,46,880", "name" : "Admin accounts", "per1" : "25", "per2" : "75" }/* , 
      { "total" : "5,72,172", "name" : "Assets accounts", "per1" : "50", "per2" : "50" },
      { "total" : "10,08,258", "name": "Receive accounts", "per1": "100", "per2" : "100" },
      { "total" : "7,12,440", "name" : "Child accounts", "per1" : "75", "per2" : "25" } */
    ]

    this.ProjectService.emitNavData.subscribe(res=>{
      this.heading = "";
      this.account_display = false;
      this.share_asset_display = false;
      this.receive_asset_display = false;
      this.child_display = false;
      this.graph1_display = false;
      this.graph2_display = false;
      console.log(res.display);

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

  ngOnInit() { }

}
