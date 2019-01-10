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

  constructor(private ProjectService: ProjectService, private router: Router) {
    this.ProjectService.emitUI.subscribe((res)=>{
      console.log(res);
      this.UI_Info = res;
    });

    $(document).ready(function () {
      $('#table_id').DataTable({
        // "fixedHeader":true,
        "scrollY"   : 380,
        "paging"    : false,
        "searching" : false,
        "ordering"  : false
      })
      var trigger = $('.hamburger'),
          overlay = $('.overlay'),
          isClosed = false
      trigger.click(function () {
        hamburger_cross()
      })
      function hamburger_cross() {
        console.log('hamburger triggered')
        if ( isClosed == false ) {
          overlay.hide()
          trigger.removeClass('is-open')
          trigger.addClass('is-closed')
          isClosed = true
        } else {
          overlay.show()
          trigger.removeClass('is-closed')
          trigger.addClass('is-open')
          isClosed = false
        }
      }
      $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled')
      })
    })
  }
  ngOnInit() {
    this.ProjectService.getUI();
    this.email_user = localStorage.getItem('userEmail')
  }

  logout(){
    this.ProjectService.logout();
  }


  ngAfterContentInit() {
    // console.log('s')
    // d3.select(“p”).style(“color”, “red”);
  }

  clicked(event:any){
    d3.select(event.target).
      append('circle')
      .attr('cx', event.x)
      .attr('cy', event.y)
      .attr('r', '10px')
      .attr('fill', '#f44')
  }

}
