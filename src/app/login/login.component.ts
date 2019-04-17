import { Component, HostListener } from '@angular/core';
import { ProjectService } from '../service/ProjectService';
import { APIService } from '../service/APIService';
import { Router } from '@angular/router';
declare var $
import * as CryptoJS from 'crypto-js';

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
  // showLoginScreen : boolean = false

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

  constructor( private ProjectService: ProjectService, private router: Router, private _api:APIService ) {
    this.ProjectService.checkLogin()
    this.ProjectService.emitUserLogin.subscribe((res) => {
      this.router.navigate(['home/'])
    })
  }

  /* Login() {
    this._api.loginuser( this.username, this.password )
    localStorage.setItem('userEmail', this.username);
  } */

  /* $("#login-button").click(function(event){
    event.preventDefault();
  
    $('form').fadeOut(500);
    $('.wrapper').addClass('form-success');
  }) */

  landingPage(){
    this.router.navigate(['./']);
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
