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
  
  Login() {
    this._api.loginuser( this.username, this.password )
    localStorage.setItem('userEmail', this.username);
  }
  gotochange() {
    this.show = false
  }
  goback() {
    this.show = true
  }
  gotoclaim() {
    this.claim = true
  }
  closeClaim() {
    this.claim = false
  }

  change() {
    if (this.new == this.confirm) {
      this._api.change(this.old, this.new, this.confirm)
    } else alert ("Password does not match. Try again!")
  }
  login() {
    let formData = new FormData();
    formData.append('email',this.email);
    formData.append('password',this.password);
    let data = { email: this.email, password:  this.password};
    // this.ProjectService.login(formData);
    this.ProjectService.login1(data);
    localStorage.setItem('userEmail',this.email);
  }
  claimAcc() {
    this._api.claimAcc(this.phone_number,this.tan_number,this.gst_number,this.pancard,this.email,this.org_name)
  }

}
