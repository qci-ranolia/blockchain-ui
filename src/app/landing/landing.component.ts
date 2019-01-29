import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    $(document).ready(function(){
      // var i = 0
      var j = 1,
      headings = new Array('1. Accounts','2. Child Accounts','3. Claim Accounts','4. Create Certificates','5. Share Certificates'),
      description = new Array(
                          'The concerned user, organisation or lab has to contact their parent organisation for their account. The primary details will be their email, phone number, pancard and orgnization name. Other information includes their GST, TAN etc.',
                          'Once the account has been created bythe parent orgnization, They need to claim their account by entering their phone number and Email for OTPs.',
                          'The organisations can create thier child account, Child account are limited to see their activity.',
                          'Any entity on this platform can create certificates and they can transfer these certificates to any other entity.',
                          'Any entity can receive certificates from other organisation, Only a parent can deactivate or renew their certificates. Any entity can share their certificates with any other entity within a time bound. Only in this time period the receiving organisation can decrypt these certificates and view them.'
                          )
      $(".project").click(function(){
          $(this).siblings().removeClass('current')
          $(this).addClass('current')
      });
      setInterval(function(){
          var k = $('ul.step-selector-list').find('.active'),
          l = $('div.step-content').find('h5.heading'),
          m = $('div.step-content').find('p.description'),
          o = $('div.graph').find('div.dots:first'),
          p = $('div.graph').find('div.dots:last'),
          q = $('div.graph').children('ul.nodes:first').find('li.scientist'),
          r = $('div.graph').children('ul.nodes:last').find('li.mines'),
          s = $('div.graph').children('ul.nodeagain').find('li.node')
          k.removeClass('active')
          if ( k.next().length !== 0 ){
              k.next().addClass('active')
              j++
              if ( j == 2 ){
                o.toggleClass('visible hidden')
                q.toggleClass('active inactive')
                s.addClass('blinking')
              } else if ( j == 3 ){
                p.toggleClass('hidden visible')
                r.toggleClass('inactive active')
                r.addClass('red')
                s.toggleClass('blinking still')
              } else if ( j == 4 ){
                r.toggleClass('red green')
              } else if ( j == 5 ){
                o.toggleClass('hidden visible')
                p.toggleClass('visible hidden')
                q.toggleClass('inactive active')
                q.addClass('finished')
                r.toggleClass('active inactive')
              }
              l.html(headings[j-1])
              m.html(description[j-1])
          } else {
              $('ul.step-selector-list li:first').addClass('active')
              j = 1
              q.removeClass('finished')
              r.removeClass('green')
              s.removeClass('still')
              l.html(headings[j-1])
              m.html(description[j-1])
          }
      }, 5000);
    });
  }
  
  showLogin(){
    this.router.navigate(['./login']);
  }
}
