import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() info:any;
  navArray: any = [];

  constructor(private ProjectService: ProjectService) {}

  ngOnInit() {
    console.log(this.info.data.parent.navigation);
    this.setNav(this.info);
    this.ProjectService.get_float_accounts();
  }

  setNav(info){
    if(info.role) {
      this.navArray = this.info.data.parent.navigation;
    } else {
      this.navArray = this.info.data.child.navigation;
    }
  }

  navButton(action) {
    if(action=="Accounts") {
      this.ProjectService.get_float_accounts();
      this.ProjectService.setAction(action);
    } if(action=="Assets") {
      this.ProjectService.get_assets();
      this.ProjectService.setAction(action);
    } if(action=="Child") {
      this.ProjectService.get_Children();
      this.ProjectService.setAction(action);
    } if(action=="Search") {
      this.ProjectService.get_search();
      this.ProjectService.setAction(action);
    }

  }

}
