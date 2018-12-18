import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() info:any;
  showSearchBar = false;
  address: string = "";

  constructor(private ProjectService: ProjectService) {

    this.ProjectService.emitHideSearchBar.subscribe(res=>{
      if(res.display=="true")
        this.showSearchBar = true;
      else
        this.showSearchBar = false;
    });

  }

  ngOnInit() {}

  search() {
    let temp = this.address;
    this.ProjectService.search_by_address(temp);
    this.address = "";
  }

}