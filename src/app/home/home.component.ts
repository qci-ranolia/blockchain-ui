import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/ProjectService';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  UI_Info: any;

  constructor(private ProjectService: ProjectService, private router: Router) {
    this.ProjectService.emitUI.subscribe((res)=>{
      console.log(res);
      this.UI_Info = res;
    });
  }

  ngOnInit() {
    this.ProjectService.getUI();
  }


}
