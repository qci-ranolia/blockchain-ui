import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/ProjectService';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email : any;
  password: any;


  constructor(private ProjectService: ProjectService, private router: Router) {

    this.ProjectService.checkLogin();

    this.ProjectService.emitUserLogin.subscribe((res)=>{
      this.router.navigate(['home/']);
    });
  }

  ngOnInit() {
  }

  login() {
    let formData = new FormData();
    formData.append('email',this.email);
    formData.append('pwd',this.password);
    this.ProjectService.login(formData);
    localStorage.setItem('userEmail',this.email);

  }

}
