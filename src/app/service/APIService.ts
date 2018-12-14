// import {Response, Headers, RequestOptions,RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class APIService {

  UI_JSON: string = '../assets/UI_JSON/';
  proURL: string = 'http://13.233.29.111:8000';
  localURL: string = 'http://192.168.15.139:8000';
  current_URL : string = this.localURL;
  appHeader: any = new HttpHeaders({ 'Autherization'  : 'true' });

  constructor(private http: HttpClient) {}

  Login(data) {
    const request = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/todos/1', {}, { reportProgress: true });
    return this.http.request(request)
  }

  Login1(data) {
    data = JSON.stringify(data);
    const request = new HttpRequest('POST', this.current_URL+"/users/login", data , { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  Get_Admin_UI() {
    const request = new HttpRequest('GET', this.UI_JSON+'/ui_admin.json', {}, { reportProgress: true });
    return this.http.request(request)
  }

  Get_Master_UI() {
    const request = new HttpRequest('GET', this.UI_JSON+'/ui_master.json', {}, { reportProgress: true });
    return this.http.request(request)
  }

  Get_Lab_UI() {
    const request = new HttpRequest('GET', this.UI_JSON+'/ui_lab.json', {}, { reportProgress: true });
    return this.http.request(request)
  }

  Get_User_UI() {
    const request = new HttpRequest('GET', this.UI_JSON+'/ui_user.json', {}, { reportProgress: true });
    return this.http.request(request)
  }

  Test2(data) {
    let _URL = "https://jsonplaceholder.typicode.com/posts";
    this.http.post(_URL,data,{}).subscribe((res) => {
     console.log(res);
    });
  }

  Test3(data) {
    data = JSON.stringify(data);
    let _URL = "http://13.233.29.111:8000/users/login";
    return this.http.post(_URL,data, {})
  }

}
