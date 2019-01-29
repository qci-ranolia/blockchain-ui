import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { APIService } from '../../service/APIService';

@Component({
  selector: 'app-floatuser',
  templateUrl: './floatuser.component.html',
  styleUrls: ['./floatuser.component.scss']
})
export class FloatuserComponent implements OnInit {
  org_name:any
  email:any
  phone_number:any
  pancard:any
  role_type:any
  constructor(private location: Location, private _api:APIService ) { }

  ngOnInit() {
  }

  refresh(): void {
    this.location.back()
  }

  addFloatUser(){
    // this._api
    // console.log(this.org_name)
    // console.log(this.email)
    // console.log(this.phone_number)
    // console.log(this.pancard)
    // console.log(this.role_type)
  }
}
