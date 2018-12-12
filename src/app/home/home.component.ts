import { Component, OnInit } from '@angular/core';
declare var $

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
    $(document).ready(function () {
      var trigger = $('.hamburger'),
          overlay = $('.overlay'),
        isClosed = false;
      trigger.click(function () {
        hamburger_cross();      
      });
    
      function hamburger_cross() {
        if (isClosed == true) {          
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {   
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
      }  
      $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
      });  
    });
  }

  ngOnInit() {
  }
}
