import { Component } from '@angular/core';
import { ProjectService } from '../service/ProjectService';
import { APIService } from '../service/APIService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username:any;
  password:any;
  old:any;
  new:any;
  confirm:any;
  show : boolean = true
  claim : boolean = false

  phone_number:any;
  tan_number:any;
  gst_number:any;
  pancard:any;
  email:any;
  org_name:any;

  constructor(private ProjectService: ProjectService, private router: Router, private _api:APIService ) {
    this.ProjectService.checkLogin()
    this.ProjectService.emitUserLogin.subscribe((res)=>{
      this.router.navigate(['home/'])
    })
  }
  
  login() {
    this._api.loginuser( this.username, this.password )
  }
  gotochange() {
    this.show = false
  }
  goback() {
    this.show = true
  }
  gotoclaim() {
    console.log('ds')
    this.claim = true
  }
  closeClaim() {
    console.log('ds')
    this.claim = false
  }

  change() {
    if (this.new == this.confirm) {
      this._api.change(this.old, this.new, this.confirm)
    } else alert ("Password does not match. Try again!")
  }

  claimAcc() {
    this._api.claimAcc(this.phone_number,this.tan_number,this.gst_number,this.pancard,this.email,this.org_name)
  }

}
