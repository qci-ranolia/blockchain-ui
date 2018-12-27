import { EventEmitter, Injectable, } from '@angular/core';
import { APIService } from './APIService';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEvent, HttpEventType, HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
declare var $
@Injectable()
export class ProjectService {

  tableHeader: any = [];
  tableData: any = [];
  month : any = '2017-10';
  globalAction: string = "";
  formElements: any = [];
  navigationData: any;

  constructor(private APIService: APIService,private route: ActivatedRoute, private router: Router,) {
    let d = new Date();
    let m = d.getMonth();
    m += 1;
    let y = d.getFullYear();
    this.month = y+'-'+m;
  }

  emitUI : EventEmitter<any> = new EventEmitter<any>();
  emitError:  EventEmitter<any> = new EventEmitter<any>();
  emitTable : EventEmitter<any> = new EventEmitter<any>();
  emitSummary: EventEmitter<any> = new EventEmitter<any>();
  emitHideTable: EventEmitter<any> = new EventEmitter<any>();
  emitToastMsg :  EventEmitter<any> = new EventEmitter<any>();
  emitUserLogin : EventEmitter<any> = new EventEmitter<any>();
  emitHideSummary: EventEmitter<any> = new EventEmitter<any>();
  emitHideSearchBar:  EventEmitter<any> = new EventEmitter<any>();
  emitNewFormSummary:  EventEmitter<any> = new EventEmitter<any>();

  emitHideFormBuilder:  EventEmitter<any> = new EventEmitter<any>();

  errorSnack(){
    $('.notification').toggleClass('active')
    setTimeout(() => {
      $('.notification').toggleClass('active')
    }, 5000 )
  }

  checkLogin() {
    let login = localStorage.getItem('login');
    if(login === 'true') {
      this.router.navigate(['./home']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['./login']);
  }

  setAction(action: string) {
    this.globalAction = action;
    console.log(this.globalAction);
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

  login(data){
    this.APIService.Login(data).subscribe((event: HttpEvent<any>) => {
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
    }, (err:HttpErrorResponse)=>{
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message)
    });
  }

  change(data){
    this.APIService.change(data).subscribe((event: HttpEvent<any>) => {
      let response = this.HttpEventResponse(event)
      if(response){
        console.log(response)
      } else console.log(response)
    }, (err:HttpErrorResponse)=>{
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message)
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

  createNewForm() {
    this.dashboardElements({table:0, summary:0, search:0, form:1});
  }

  createNewFormElements(formElement: any) {
    this.formElements = formElement
    console.log(this.formElements)
  }

  checkToken(res) {
    console.log(res);
    if(res.statusText) {
      if(res.statusText==="Unauthorized" || res.status===401) {
        this.logout();
      }
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
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err);
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
    }, (err:HttpErrorResponse)=>{
      console.log("Error 2");
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message);
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
    }, (err:HttpErrorResponse)=>{
      console.log("Error 2");
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message);
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
    }, (err:HttpErrorResponse)=>{
      this.checkToken(err);
      console.log("Error 2");
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message);
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
    }, (err:HttpErrorResponse)=>{
      this.tableData = [];
      this.tableHeader = [];
      this.emitTable.emit({header: this.tableHeader, data:this.tableData})
      this.checkToken(err);
      console.log("Error 3");
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message);
    })
  }

  get_float_accounts() {
    // this.emitHideSummary.emit({display:"false"});
    // this.emitHideTable.emit({display:"false"});
    this.dashboardElements({table:0,summary:0,search:0,form:0});
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
    }, (err:HttpErrorResponse)=>{
      this.tableData = [];
      this.tableHeader = [];
      this.emitTable.emit({header: this.tableHeader, data:this.tableData})
      this.checkToken(err);
      console.log("Error 4");
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message);
    })
  }

  getSummary(i) {
    this.emitSummary.emit({header:this.tableHeader, data:this.tableData[i]});
    // let temp = this.tableData.data[i];
  }

  get_Children() {
    // this.emitHideSummary.emit({display:"false"});
    // this.emitHideTable.emit({display:"false"});
    this.dashboardElements({table:0,summary:0,search:0, form:0});
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
    }, (err:HttpErrorResponse)=>{
      this.tableData = [];
      this.tableHeader = [];
      this.emitTable.emit({header: this.tableHeader, data:this.tableData})
      this.checkToken(err);
      console.log("Error 5");
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message);
    })
  }

  get_search() {
    this.dashboardElements({table:0,summary:0,search:1, form:0});

  }

  dashboardElements(elements: {table:number , summary:number, search:number, form:number}) {
    if(elements.table==1) {
      this.emitHideTable.emit({display:"true"});
    }
    if(elements.table==0) {
      this.emitHideTable.emit({display:"false"});
    }
    if(elements.summary==1) {
      this.emitHideSummary.emit({display:"true"});
    }
    if(elements.summary==0) {
      this.emitHideSummary.emit({display:"false"});
    }
    if(elements.search==1) {
      this.emitHideSearchBar.emit({display:"true"});
    }
    if(elements.search==0) {
      this.emitHideSearchBar.emit({display:"false"});
    }
    if(elements.form==1) {
      this.emitHideFormBuilder.emit({display:"true"});
    }
    if(elements.form==0) {
      this.emitHideFormBuilder.emit({display:"false"});
    }

  }

  search_by_address(data) {
    this.APIService.Search_By_Address(data).subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){
        console.log(response)
        console.log(response.headers)
        this.emitSummary.emit({header:response.headers, data:response.data});
      } else {
        console.log("bep 07");
      }
    }, (err:HttpErrorResponse)=>{
      this.checkToken(err);
      console.log("Error 6");
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message);
    });
  }

  get_assets() {
    this.dashboardElements({table:0,summary:0,search:0, form:0});
    this.APIService.Get_Assets().subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){
        console.log(response)
        this.tableData = response.data;
        this.tableHeader = response.headers;
        this.emitTable.emit({header: this.tableHeader, data:this.tableData})
      } else {
        console.log("bep 08");
      }
    }, (err:HttpErrorResponse)=>{
      this.tableData = [];
      this.tableHeader = [];
      this.emitTable.emit({header: this.tableHeader, data:this.tableData})
      this.checkToken(err);
      console.log("Error 7");
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message);
    })
  }

  submitForm(response,url) {
    this.APIService.SubmitForm(response, url).subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){
        console.log(response)
        alert("Success : " +response.success);
        // this.tableData = response.data;
        // this.tableHeader = response.headers;
        // this.emitTable.emit({header: this.tableHeader, data:this.tableData})
      } else {
        console.log("bep 09");
      }
    }, (err)=>{
      console.log(err);
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message)
    });
  }

  viewAll(email) {
    this.dashboardElements({table:0,summary:0,search:0, form:0});
    this.APIService.ViewAll(email).subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){
        console.log(response)
        this.tableData = response.data;
        this.tableHeader = response.headers;
        this.emitTable.emit({header: this.tableHeader, data:this.tableData})
      } else {
        console.log("bep 08");
      }
    }, (err)=>{
      this.tableData = [];
      this.tableHeader = [];
      this.emitTable.emit({header: this.tableHeader, data:this.tableData})
      console.log(err)
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message)
    })
  }

  get_receive_assets() {
    this.dashboardElements({table:0,summary:0,search:0, form:0});
    this.APIService.Get_Receive_Assets().subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){
        console.log(response)
        this.tableData = response.data;
        this.tableHeader = response.headers;
        this.emitTable.emit({header: this.tableHeader, data:this.tableData})
      } else {
        console.log("bep 09");
      }
    }, (err)=>{
      this.tableData = [];
      this.tableHeader = [];
      this.emitTable.emit({header: this.tableHeader, data:this.tableData})
      console.log(err)
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message)
    })
  }

  viewAllReceiveAssets(address) {
    this.dashboardElements({table:0,summary:0,search:0, form:0});
    this.APIService.View_All_Receive_Assets(address).subscribe((event: HttpEvent<any>) =>{
      let response = this.HttpEventResponse(event)
      if(response){
        console.log(response)
        this.tableData = response.data;
        this.tableHeader = response.headers;
        this.emitTable.emit({header: this.tableHeader, data:this.tableData})
      } else {
        console.log("bep 10");
      }
    }, (err)=>{
      this.tableData = [];
      this.tableHeader = [];
      this.emitTable.emit({header: this.tableHeader, data:this.tableData})
      console.log(err)
      this.emitError.emit(err.error.message)
      this.errorSnack()
      console.log(err.error.message)
    })
  }

}
