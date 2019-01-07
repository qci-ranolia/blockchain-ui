import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common'
import { APIService } from '../../service/APIService';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-claimaccount',
  templateUrl: './claimaccount.component.html',
  styleUrls: ['./claimaccount.component.scss']
})

export class ClaimaccountComponent implements OnInit {
  email:string
  phone_number:string
  otp_view:boolean = false

  tan_number  : any = null;
  gst_number  : any = null;
  pancard     : any;
  org_name    : any;
  password    : any;
  otp_mobile  : string
  otp_email   : string

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.charCode == 13){
      if ( this.otp_view == false ) this.sendOTP()
      else this.submit_OTP()
    }
  }

  constructor( private ProjectService: ProjectService, private location : Location, private _api : APIService, private router: Router ){ }

  ngOnInit() { }

  refresh() : void {
    this.location.back()
  }

  sendOTP() {
    this._api.sendOTP(this.email,this.phone_number)
    .pipe(
      catchError(this._api.handleError)
    )
    .subscribe(resp => {
      if (resp.success){
        this.otp_view = true
      } else {
        this.otp_view = false
      }
    })
  }

  submit_OTP(){
    const data = {"pancard":this.pancard,
      "otp_email":this.otp_email,
      "otp_mobile":this.otp_mobile,
      "phone_number":this.phone_number,
      "email":this.email,
      "password":this.password,
      "org_name":this.org_name,
      "gst_number":this.gst_number,
      "tan_number":this.tan_number}

    this._api.submit_OTP(data)
    .pipe(
      catchError(this._api.handleError)
    )
    .subscribe(resp => {
      if (resp.success){
        this.router.navigate(['./login']);
      } else {
        alert("Error");
      }
    })
  }

}
