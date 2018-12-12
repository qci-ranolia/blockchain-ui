// import {Response, Headers, RequestOptions,RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class APIService {
  token : string
  headers : any
  opts : any
  url = "http://13.233.29.111:8000/users/login";
  request : any
  
  
  projectURL: string = '../assets/APIData/';
  constructor(private http: HttpClient) {}
    Login(data) {
      const request = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/todos/1', {}, { reportProgress: true });
      return this.http.request(request)
    }

    loginuser(uname : string, pwd : string){
      this.ser(uname,pwd)
      .subscribe(resp => {console.log(resp.status)})
    }
    ser( uname : string, pwd : string ):Observable<HttpResponse<any>>{
      let tmp : any = { email : uname, password : pwd }
      let data = JSON.stringify(tmp)
      return this.http.post<any>(
        this.url, data)
       .pipe(
          catchError(this.handleError)
        );
    }
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    };
}
