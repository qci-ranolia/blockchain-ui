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
  url = "http://192.168.15.139:8000/";
  request : any
  
  emitOTP = new EventEmitter<any>()
  
  projectURL: string = '../assets/APIData/';
  constructor(private http: HttpClient) {}
    Login(data) {
      const request = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/todos/1', {}, { reportProgress: true });
      return this.http.request(request)
    }

    loginuser(uname : string, pwd : string){
      this.ser(uname,pwd)
      .subscribe(resp => {console.log(resp)})
    }
    ser( uname : string, pwd : string ):Observable<HttpResponse<any>>{
      let tmp : any = { email : uname, password : pwd }
      let data = JSON.stringify(tmp)
      return this.http.post<any>( this.url+'users/login', data )
      .pipe(
        catchError(this.handleError)
      )
    }

    change(old : string, newPassword: string, oldPassword: string){
      let tmp : any = { key1 : old, key2 : newPassword, key3 : oldPassword }
      let data = JSON.stringify(tmp)
      return this.http.post<any>( this.url+'', data )
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(resp => {console.log(resp)})
    }
    claimAcc(org_name : string, email : string,pancard : string,gst_number : string,tan_number : string,phone_number : string){
      let tmp : any = {
        org_name    : org_name,
        email       : email,
        pancard     : pancard,
        gst_number  : gst_number,
        tan_number  : tan_number,
        phone_number: phone_number
      }
      let data = JSON.stringify(tmp)
      return this.http.post<any>( this.url+'', data )
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(resp => {console.log(resp)})
    }


    sendOTP(email:string, phone_number:string){
      let tmp : any = {
        email       : email,
        phone_number: phone_number
      }
      let data = JSON.stringify(tmp)
      return this.http.post<any>( this.url+'accounts/get_otp', data )
      // .subscribe(resp => {
      //   // this.emitOTP
      //   console.log(resp)

      // })
    }

    submit_OTP(data:any){
        let payload = JSON.stringify(data)
        console.log(payload)
        return this.http.post<any>( this.url+'accounts/claim_account', payload )
    }
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error)
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,

        console.error(
          `Backend returned code ${error.status}, ` + `body was: ${error.error}`, 
          `Backend returned code ${error.message}, ` + `body was: ${error.error}`)
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.')
    }
    

}
