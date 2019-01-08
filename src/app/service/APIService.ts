// import {Response, Headers, RequestOptions,RequestOptions, RequestMethod} from '@angular/http';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpErrorResponse, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
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
  url = "http://13.233.29.111:8000/";
  // url = "http://192.168.15.139:8000/";
  // url: string = '../assets/UI_JSON/';
  request : any

  // emitOTP = new EventEmitter<any>()

  projectURL: string = '../assets/APIData/';
  UI_JSON: string = '../assets/UI_JSON/';
  proURL: string = 'http://13.233.29.111:8000';
  localURL: string = 'http://192.168.15.139:8000';
  current_URL : string = this.proURL;
  // current_URL : string = this.proURL;
  Header: any;
  appHeader: any = new HttpHeaders({ 'Autherization'  : 'true' });

  constructor(private http: HttpClient) {}
    // Login(data) {
    //   const request = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/todos/1', {}, { reportProgress: true });
    //   return this.http.request(request)
    // }

    loginuser(uname : string, pwd : string){
      this.ser(uname,pwd)
      .subscribe(resp => {console.log(resp)})
    }
    ser( uname : string, pwd : string ):Observable<HttpResponse<any>>{
      let tmp : any = { email : uname, password : pwd }
      let data = JSON.stringify(tmp)
      return this.http.post<any>( this.current_URL+'users/login', data )
      .pipe(
        catchError(this.handleError)
      )
    }

    // change(email : string, newPassword: string, new_password: string){
    //   let tmp : any = { email : email, password : new_password, new_password : new_password }
    //   let data = JSON.stringify(tmp)
    //   return this.http.post<any>( 'http://192.168.15.139:8000/'+'users/change_password', data )
    //   .pipe(
    //     catchError(this.handleError)
    //   )
    //   .subscribe(resp => {console.log(resp)})
    // }
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
      return this.http.post<any>( this.current_URL+'', data )
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
      return this.http.post<any>( this.current_URL+'accounts/get_otp', data )
    }

    submit_OTP(data:any){
        let payload = JSON.stringify(data)
        console.log(payload)
        return this.http.post<any>( this.current_URL+'accounts/claim_account', payload )
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
          `Backend returned code ${error.message}, ` + `body was: ${error.error}`
        )
        
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.')
    }

  setHeader() {
    let token = localStorage.getItem('token');
    this.appHeader = new HttpHeaders({'token': ""+token});
    this.appHeader.append({'Content-Type':'application/json'});
  }

  change(data) {
    data = JSON.stringify(data);
    const request = new HttpRequest('POST', this.current_URL+'users/change_password', data , { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  Login(data) {
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

  Get_Organization_Accounts() {
    this.setHeader();
    const request = new HttpRequest('GET', this.current_URL+'/accounts/get_organization_account', { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  Get_Float_Accounts() {
    this.setHeader();
    const request = new HttpRequest('GET', this.current_URL+'/accounts/get_float_accounts', { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  Get_Children() {
    this.setHeader();
    const request = new HttpRequest('GET', this.current_URL+'/accounts/get_children', { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  Get_Assets() {
    this.setHeader();
    const request = new HttpRequest('GET', this.current_URL+'/assets/assets', { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  Get_Claim_Accounts() {
    this.setHeader();
    const request = new HttpRequest('GET', this.current_URL+'/accounts/claim_account', { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  Search_By_Address(data) {
    let params = new HttpParams().set('address', data);
    const request = new HttpRequest('GET', this.current_URL+'/accounts/address', { reportProgress: true, params: params, headers: this.appHeader });
    return this.http.request(request)
  }

  Get_Receive_Assets() {
    const request = new HttpRequest('GET', this.current_URL+'/assets/receive_assets', { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  SubmitForm(response, url) {
    const request = new HttpRequest('POST', this.current_URL+url, response , { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  ViewAll(email) {
    let params = new HttpParams().set('email', email);
    const request = new HttpRequest('GET', this.current_URL+'/accounts/float_accounts_on_address', { reportProgress: true, params: params, headers: this.appHeader });
    return this.http.request(request)
  }

  View_All_Receive_Assets(address) {
    let params = new HttpParams().set('receive_address', address);
    const request = new HttpRequest('GET', this.current_URL+'/assets/shared_on_receive_assets', { reportProgress: true, params: params, headers: this.appHeader });
    return this.http.request(request)
  }

}
