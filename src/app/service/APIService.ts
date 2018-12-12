// import {Response, Headers, RequestOptions,RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class APIService {

  projectURL: string = '../assets/APIData/';

  constructor(private http: HttpClient) {}

  Login(data) {
    const request = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/todos/1',
                                    {}, { reportProgress: true });
    return this.http.request(request)

  }

}
