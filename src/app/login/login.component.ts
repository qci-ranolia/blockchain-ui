import { Component, HostListener } from '@angular/core';
import { ProjectService } from '../service/ProjectService';
import { APIService } from '../service/APIService';
import { Router } from '@angular/router';
declare var $

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  username:any;
  password:any;
  mail:any;
  new:any;
  confirm:any;
  change_password : boolean = false
  forgot_password : boolean = false
  showLoginScreen : boolean = false

  claim : boolean = false

  phone_number:any;
  tan_number:any;
  gst_number:any;
  pancard:any;
  email:any;
  org_name:any;


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.charCode == 13){
      this.login()
    }
  }

  constructor(private ProjectService: ProjectService, private router: Router, private _api:APIService ) {
    this.ProjectService.checkLogin()
    this.ProjectService.emitUserLogin.subscribe((res)=>{
      this.router.navigate(['home/'])
    })
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
          r = $('div.graph').children('ul.nodes:last').find('li.mines')
          k.removeClass('active')
          if ( k.next().length !== 0 ){
              k.next().addClass('active')
              j++
              if ( j == 2 ){
                o.toggleClass('visible hidden')
                q.toggleClass('active inactive')
              } else if ( j == 3 ){
                p.toggleClass('hidden visible')
                r.toggleClass('inactive active')
                r.addClass('red')
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
              l.html(headings[j-1])
              m.html(description[j-1])
          }
      }, 5000);
    });
  }

  /* Login() {
    this._api.loginuser( this.username, this.password )
    localStorage.setItem('userEmail', this.username);
  } */
  showLogin(){
    this.showLoginScreen = true
  }
  gotochange() {
    this.change_password = true
  }
  close_change() {
    this.change_password = false
  }
  gotoforgot(){
    this.forgot_password = true
  }
  close_forgot() {
    this.forgot_password = false
  }
  gotoclaim() {
    this.router.navigate(['./claimaccount']);
  }
  closeClaim() {
    this.claim = false
  }

  change() {
    if (this.new == this.confirm) {
      let temp = {
        'email' : this.mail,
        'password' : this.new,
        'new_password' : this.confirm
      }
      this.ProjectService.change(temp)
    } else alert ("Password does not match. Try again!")
  }
  login() {
    let formData = new FormData();
    formData.append('email',this.email);
    formData.append('password',this.password);
    let data = { email: this.email, password:  this.password};
    // this.ProjectService.login(formData);
    this.ProjectService.login(data);
    localStorage.setItem('userEmail',this.email);
  }
  claimAcc() {
    this._api.claimAcc(this.phone_number,this.tan_number,this.gst_number,this.pancard,this.email,this.org_name)
  }

}
