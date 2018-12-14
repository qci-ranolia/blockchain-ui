import { Component, OnInit } from '@angular/core'
declare var $

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  constructor() {
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
        if (isClosed == false) {
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
  }
}