import { EventEmitter, Injectable, } from '@angular/core';
import { APIService } from './APIService';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  HttpEvent, HttpEventType,  HttpClient,  HttpRequest} from '@angular/common/http';

@Injectable()
export class ProjectService {

  month : any = '2017-10';

  constructor(private APIService: APIService,private route: ActivatedRoute, private router: Router,) {
    let d = new Date();
    let m = d.getMonth();
    m += 1;
    let y = d.getFullYear();
    this.month = y+'-'+m;

  }

  emitToastMsg :  EventEmitter<any> = new EventEmitter<any>();
  emitUserLogin : EventEmitter<any> = new EventEmitter<any>();

  checkLogin() {
    let login = localStorage.getItem('login');
    if(login === 'true1') {
      this.router.navigate(['./home']);
    }
  }

  login(data) {

    this.APIService.Login(data).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request started');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Headers received ->', event.headers);
          break;
        case HttpEventType.DownloadProgress:
          const loaded = Math.round(event.loaded / 1024);
          console.log(`Downloading ${ loaded } kb downloaded`);
          break;
        case HttpEventType.Response:
          console.log('Finished -> ', event.body);
      }
    });


    // this.APIService.Login(data).subscribe((res)=>{
    //   console.log(res);
    //   if(res.success) {
    //     this.emitUserLogin.emit('user');
    //   } else {
    //   }
    // }, (err)=>{
    //   console.log(err);
    // });
  }

}
