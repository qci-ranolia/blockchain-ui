import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  @Input() info:any;
  navArray: any = [];
  status : boolean = false;

  constructor( private ProjectService: ProjectService, private router: Router ) { }

  ngOnInit() {
    // console.log(this.info);
    // console.log(this.info.data.parent.navigation);
    this.setNav(this.info);

    // home page for the dashboard
    this.ProjectService.setAction("Home");
    this.ProjectService.showHomePage();
    // this.ProjectService.get_float_accounts();
    // this.ProjectService.setAction("Accounts");
    // this.ProjectService.createNewFormElements(this.info.data.parent.navigation[0].createNewForm);
  }

  setNav(info){
    if(info.role) {
      this.navArray = this.info.data.parent.navigation;
      this.ProjectService.navigationData = this.navArray;
    } else {
      this.navArray = this.info.data.child.navigation;
      this.ProjectService.navigationData = this.navArray;
    }
  }

  navButton(action) {
    let details : any;
    for(let i = 0; i< this.navArray.length; i++) {
      if(action === this.navArray[i].data) {
        this.ProjectService.createNewFormElements(this.navArray[i].createNewForm);
      }
    }
    if(action=="Home") {
      // this.status = false
      this.ProjectService.setAction(action);
      this.ProjectService.showHomePage();
    } if(action=="Accounts") {
      // this.status = false
      // alert(this.status)
      this.ProjectService.get_float_accounts();
      this.ProjectService.setAction(action);
    } if(action=="Assets") {
      // this.status = !this.status
      // alert(this.status)
      this.ProjectService.get_assets();
      this.ProjectService.setAction(action);
    } if(action=="Receive") {
      // this.status = !this.status
      this.ProjectService.get_receive_assets();
      this.ProjectService.setAction(action);
    } if(action=="Child") {
      this.status = false
      this.ProjectService.get_Children();
      this.ProjectService.setAction(action);
    } if(action=="Search") {
      this.status = false
      this.ProjectService.get_search();
      this.ProjectService.setAction(action);
    }
  }
}
