import { EventEmitter, Injectable, } from '@angular/core';
import { APIService } from './APIService';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  HttpEvent, HttpEventType,  HttpClient,  HttpRequest} from '@angular/common/http';

@Injectable()
export class ProjectService {

  tableHeader: any = [];
  tableData: any = [];
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
  emitUI : EventEmitter<any> = new EventEmitter<any>();
  emitTable : EventEmitter<any> = new EventEmitter<any>();
  emitSummary: EventEmitter<any> = new EventEmitter<any>();
  emitHideTable: EventEmitter<any> = new EventEmitter<any>();
  emitHideSummary: EventEmitter<any> = new EventEmitter<any>();

  checkLogin() {
    let login = localStorage.getItem('login');
    if(login === 'true') {
      this.router.navigate(['./home']);
    }
  }

  HttpEventResponse(event) {
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
        return event.body;
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
  }

  login1(data){
    this.APIService.Login1(data).subscribe((event: HttpEvent<any>) => {
      let response = this.HttpEventResponse(event)
     if(response){
       if(response.authorization){

         let role = ""+response.role;
         let token = ""+response.authorization;
         let parent_role = ""+response.parent_role;

         console.log("Authorization Token => "+token);

         localStorage.setItem('login',"true");
         localStorage.setItem('role', role);
         localStorage.setItem('token', token);
         localStorage.setItem('parent_role', parent_role);

         this.emitUserLogin.emit({login:'true', role: role});
       } else {
        console.log("Authorization Failed");
       }
     }

    }, (err)=>{
    console.log(err);
    });
  }

  getUI(){
    let role = localStorage.getItem('role');
    let parent_role = localStorage.getItem('parent_role');
    if(role==="ADMIN"){
      this.get_admin_ui(role, null);
    }
    if(role==="MASTER"){
      this.get_master_ui(role, null);
    }
    if(role==="LAB"){
      this.get_admin_ui(role, null);
    }
    if(role==="USER"){
      this.get_admin_ui(role, null);
    }
    if(role==="CHILD"){
      if(parent_role==="ADMIN"){
        this.get_admin_ui(parent_role, role);
      }
      if(parent_role==="MASTER"){
        this.get_master_ui(parent_role, role);
      }
      if(parent_role==="LAB"){
        this.get_lab_ui(parent_role, role);
      }
      if(parent_role==="USER"){
        this.get_user_ui(parent_role, role);
      }
    } else {
      console.log('Role not found');
    }
  }

  get_admin_ui(parent_role, role){
    this.APIService.Get_Admin_UI().subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){
        this.emitUI.emit({role:parent_role, child:role, data:response})
      } else {
        console.log("bep 01");
      }
    }, (err)=>{
      console.log("Error 2");
    });
  }

  get_master_ui(parent_role, role){
    this.APIService.Get_Master_UI().subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){
        this.emitUI.emit({role:parent_role, child:role, data:response})
      } else {
        console.log("bep 02");
      }
    }, (err)=>{
      console.log("Error 2");
    });
  }

  get_lab_ui(parent_role, role){
    this.APIService.Get_Lab_UI().subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){
        this.emitUI.emit({role:parent_role, child:role, data:response})
      } else {
        console.log("bep 03");
      }
    }, (err)=>{
      console.log("Error 2");
    });
  }

  get_user_ui(parent_role, role){
    this.APIService.Get_User_UI().subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){
        this.emitUI.emit({role:parent_role, child:role, data:response})
      } else {
        console.log("bep 04");
      }
    }, (err)=>{
      console.log("Error 2");
    });
  }

  get_organization_accounts() {
    this.APIService.Get_Organization_Accounts().subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){
        console.log(response)

        this.tableData = response.data;
        this.tableHeader = response.headers;

        this.emitTable.emit({header: this.tableHeader, data:this.tableData})

      } else {
        console.log("bep 05");
      }
    }, (err)=>{
      console.log("Error 3");
    })
  }

  get_float_accounts() {
    this.emitHideSummary.emit({display:"false"});
    this.emitHideTable.emit({display:"false"});
    this.APIService.Get_Float_Accounts().subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){
        console.log(response)

        this.tableData = response.data;
        this.tableHeader = response.headers;

        this.emitTable.emit({header: this.tableHeader, data:this.tableData})

      } else {
        console.log("bep 06");
      }
    }, (err)=>{
      console.log("Error 4");
    })
  }

  getSummary(i) {
    this.emitSummary.emit({header:this.tableHeader, data:this.tableData[i]});
    // let temp = this.tableData.data[i];
  }

  get_Children() {
    this.emitHideSummary.emit({display:"false"});
    this.emitHideTable.emit({display:"false"});
    this.APIService.Get_Children().subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){

        console.log(response)
        this.tableData = response.data;
        this.tableHeader = response.headers;

        this.emitTable.emit({header: this.tableHeader, data:this.tableData})

      } else {
        console.log("bep 06");
      }
    }, (err)=>{
      console.log("Error 5");
    })
  }

  test2(data){
    this.APIService.Test2(data);
  }

  test3(data) {
    this.APIService.Test3(data).subscribe((res)=>{
      console.log(res);
    }, (err)=>{
      console.log(err);
    });
  }

}
