import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './service/ProjectService';

@Component({
  selector : 'app-root',
  templateUrl : './app.component.html',
  styleUrls : ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'blockchain UI';
  username : any
  password : any
  message : string

  constructor( private ProjectService : ProjectService ){}
  ngDoCheck(){
    this.ProjectService.emitError.subscribe((res)=>{
      this.message = res
    })
  }
}