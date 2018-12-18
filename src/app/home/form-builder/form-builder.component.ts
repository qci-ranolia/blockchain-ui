import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  showForm = false;

  jsonArray : any = [
    { name: "Name", type: "text" },
    { name: "Pan", type: "text" },
    { name: "Email", type: "email" },
    { name: "Role", type: "dropdown", options: ["Admin", "Master","Lab", "User"] }
  ];

  constructor(private ProjectService: ProjectService) {
    this.ProjectService.emitHideFormBuilder.subscribe(res=>{
      console.log(res);
      if(res.display==="true") {
        this.showForm = true;
      } else {
        this.showForm = false;
      }
    })
  }

  ngOnInit() {}

}
