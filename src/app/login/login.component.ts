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
  username : any;
  password: any;

  constructor(private ProjectService: ProjectService, private router: Router, private _api:APIService ) {

    this.ProjectService.checkLogin();

    this.ProjectService.emitUserLogin.subscribe((res)=>{
      this.router.navigate(['home/']);
    });
  }

  
  login() {
    this._api.loginuser(this.username,this.password)
  }

}
