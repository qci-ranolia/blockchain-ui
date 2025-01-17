import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpErrorResponse, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  request : any

  projectURL : string = '../assets/APIData/'
  UI_JSON : string = '../assets/UI_JSON/'
  proURL : string = 'http://13.233.29.111:8000'
  localURL : string = 'http://192.168.15.139:8000'
  priyankURL : string = 'http://192.168.15.221:8000'
  proURL2 : string = 'http://13.233.242.93:8000'
  newUrl : string = 'http://13.233.125.160:8000'
  // current_URL : string = this.localURL;
  current_URL : string = this.newUrl /* this.priyankURL; */ /* this.proURL; */ // this.localURL;
  Header : any
  appHeader : any = new HttpHeaders({ 'Autherization' : 'true' })

  constructor( private http: HttpClient ) {}

  /* loginuser(uname : string, pwd : string){
    this.ser(uname,pwd)
    .subscribe(resp => {console.log(resp)})
  }
  
  ser( uname: string, pwd: string ):Observable<HttpResponse<any>>{
    let tmp : any = { email : uname, password : pwd }
    let data = JSON.stringify(tmp)
    return this.http.post<any>( this.current_URL+'accounts/users/login', data )
    .pipe(
      catchError(this.handleError)
    )
  } */
  
  claimAcc( org_name : string, email : string, pancard : string, gst_number : string, tan_number : string, phone_number : string ){
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

  sendOTP(tmp:any){
    let data = JSON.stringify(tmp)
    const request = new HttpRequest('POST', this.current_URL+'/accounts/helper/get_otp', data)
    return this.http.request(request)
  }

  submit_OTP(data:any){
      let payload = JSON.stringify(data)
      const request = new HttpRequest('POST', this.current_URL+'/accounts/float/claim_account', payload)
      return this.http.request(request)
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Frontend:', error)
    } else {
      // The backend response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`,
        `Backend returned code ${error.error.message}, ` + `body was: ${error.error}`
      )
    }
    // return an observable with a user-facing error message
    return throwError(error.error.message)
  }

  setHeader() {
    let token = localStorage.getItem('token');
    // console.log(token);
    this.appHeader = new HttpHeaders({'token': ""+token});
    this.appHeader.append({'Content-Type':'application/json'});
    // console.log(token);
  }

  change(data) {
    data = JSON.stringify(data);
    const request = new HttpRequest('POST', this.current_URL+'/users/change_password', data , { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  awsUrl(data){
    // this.http.get(data).subscribe(data => {
    //   console.log(data)
    // })
    const request = new HttpRequest('GET', data, {}, {reportProgress:true})
    return this.http.request(request)
  }

  Login(data) {
    data = JSON.stringify(data);
    const request = new HttpRequest('POST', this.current_URL+"/accounts/users/login", data , { reportProgress: true, headers: this.appHeader });
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

  GetDisplayData() {
    this.setHeader();
    const request = new HttpRequest('GET', this.current_URL+'/accounts/helper/display_data', {}, { reportProgress: true, headers: this.appHeader });
    // const request = new HttpRequest('GET', this.UI_JSON+'/display_data.json', {}, { reportProgress: true });
    return this.http.request(request)
  }

  Get_Organization_Accounts() {
    this.setHeader();
    const request = new HttpRequest('GET', this.current_URL+'/accounts/organization/get_organization_account', { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  Get_Float_Accounts() {
    this.setHeader();
    const request = new HttpRequest('GET', this.current_URL+'/accounts/float/get_float_accounts', { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  Get_Children() {
    this.setHeader();
    const request = new HttpRequest('GET', this.current_URL+'/accounts/child/get_children', { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  Get_Assets() {
    this.setHeader();
    const request = new HttpRequest('GET', this.current_URL+'/assets/create_asset/assets', { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  Get_Claim_Accounts() {
    this.setHeader();
    const request = new HttpRequest('GET', this.current_URL+'/accounts/float/claim_account', { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  Search_By_Address(data) {
    let params = new HttpParams().set('address', data);
    const request = new HttpRequest('GET', this.current_URL+'/accounts/helper/address', { reportProgress: true, params: params, headers: this.appHeader });
    return this.http.request(request)
  }

  Get_Receive_Assets() {
    this.setHeader();
    const request = new HttpRequest('GET', this.current_URL+'/assets/receive_asset/receive_assets', { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  SubmitForm(response, url) {
    this.setHeader();
    const request = new HttpRequest('POST', this.current_URL+url, response , { reportProgress: true, headers: this.appHeader });
    return this.http.request(request)
  }

  ViewAll(email) {
    this.setHeader();
    let params = new HttpParams().set('email', email);
    const request = new HttpRequest('GET', this.current_URL+'/accounts/float/float_accounts_on_address', { reportProgress: true, params: params, headers: this.appHeader });
    return this.http.request(request)
  }

  View_All_Receive_Assets(address) {
    this.setHeader();
    let params = new HttpParams().set('receive_address', address);
    const request = new HttpRequest('GET', this.current_URL+'/assets/receive_asset/shared_on_receive_assets', { reportProgress: true, params: params, headers: this.appHeader });
    return this.http.request(request)
  }

  Get_Trail(address) {
    this.setHeader();
    let params = new HttpParams().set('address', address);
    const request = new HttpRequest('GET', this.current_URL+'/assets/share_asset/trail', { reportProgress: true, params: params, headers: this.appHeader });
    return this.http.request(request)
  }

  GetFileData(url) {
    let temp  = this.http.get(url, {responseType: 'text'});
    // console.log(temp)
    return temp
  }

}
