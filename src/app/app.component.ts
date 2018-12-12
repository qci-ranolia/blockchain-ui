import { Component } from '@angular/core';
import { ApiserviceService } from './service/apiservice.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blockchainUI';
  username: any
  password: any

  constructor(private api: ApiserviceService) {
  
  }
  login(){
    this.api.loginuser(this.username,this.password)
  }

}
