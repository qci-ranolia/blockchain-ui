import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor( private router: Router, private elementRef:ElementRef ) {
    $(document).ready(function(){
      // Add smooth scrolling to all links in navbar + footer link
      $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    
        // Prevent default anchor click behavior
        event.preventDefault();
    
        // Store hash
        var hash = this.hash;
    
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
       
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      });
      
      // Slide in elements on scroll
      $(window).scroll(function() {
        $(".slideanim").each(function(){
          var pos = $(this).offset().top;
    
          var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
              $(this).addClass("slide");
            }
        });
      });
    })
  }

  ngOnInit() {

    var l = document.createElement("link");
    l.rel = "stylesheet";
    // l.integrity = 'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u';
    l.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    this.elementRef.nativeElement.appendChild(l);

    var s = document.createElement("script");
    s.crossOrigin = "anonymous";
    // s.integrity = 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa';
    s.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  goLogin(){
    this.router.navigate(['/login'])
  }

}
