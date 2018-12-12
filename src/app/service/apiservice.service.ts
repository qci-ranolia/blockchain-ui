import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/common/http'
import { HttpClient, HttpRequest,HttpErrorResponse, HttpResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { map } from 'rxjs/operators'
import { catchError, retry } from 'rxjs/operators';

// 

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  token : string
  headers : any
  opts : any
  url = "http://13.233.29.111:8000/users/login";
  // getjson : Getjson;
  request : any
  
  constructor(private http: HttpClient ) { }


loginuser(uname : string, pwd : string){
  this.ser(uname,pwd)
    // resp is of type `HttpResponse<Config>`
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
    // return this.http.post( this.url + 'users/login', data )
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

  // loginuser(uname : string, pwd : string){
  //   let tmp : any = { email : uname, password : pwd }
  //   let data = JSON.stringify(tmp)
  //   this.request = new HttpRequest('POST', this.url, data, { reportProgress: true });
  //   // console.log(this.http.request(this.request))
    
  //   this.http.request(this.request).subscribe(res=>{console.log(res)})
  // }
}

  // localStorage.setItem('token', response.authorization)
  //     this.token = localStorage.getItem('token') // If this token available, login using can activate gaurd
  //     this.headers = new Headers() // Default headers
  //     this.headers.append('Authorization', this.token) // ADD/Append your authorized token to Default headers
  //     // this.opts = new RequestOptions()
  //     // this.opts.headers = this.headers
  //     // this.router.navigate(['/'])
  // } else console.log(response) //this.snackBars(response.message, response.success)
  // resolve(true)