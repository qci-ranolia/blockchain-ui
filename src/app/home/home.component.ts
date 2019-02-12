import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ProjectService } from '../service/ProjectService';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as d3 from "d3"
declare var $

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterContentInit {
  UI_Info: any;
  email_user : string;
  heading: "";
  isClosed : boolean = false

  constructor(private ProjectService: ProjectService, private router: Router) {
    this.ProjectService.emitUI.subscribe((res)=>{
      console.log(res);
      this.UI_Info = res;
    });
  }

  ngOnInit() {
    this.ProjectService.getUI();
    this.email_user = localStorage.getItem('userEmail')
  }

  hamburger(){
    if ( this.isClosed == false ) {
      $('.overlay').hide()
      $('#wrapper').removeClass('toggled')
      $('.hamburger').removeClass('is-open')
      $('.hamburger').addClass('is-closed')
      this.isClosed = true
    } else {
      $('.overlay').show()
      $('#wrapper').addClass('toggled')
      $('.hamburger').removeClass('is-closed')
      $('.hamburger').addClass('is-open')
      this.isClosed = false
    }
  }

  logout(){
    if ( window.confirm(" Are you sure to logout? ") ) {
      this.ProjectService.logout();
    }
  }

  profile(){
    this.ProjectService.profile();
  }

  ngAfterContentInit() {
    // console.log('s')
    // d3.select(“p”).style(“color”, “red”);
  }

  // clicked(event:any){
  //   d3.select(event.target).
  //     append('circle')
  //     .attr('cx', event.x)
  //     .attr('cy', event.y)
  //     .attr('r', '10px')
  //     .attr('fill', '#f44')
  // }
}
