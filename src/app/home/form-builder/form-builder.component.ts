import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  showForm = false;
  responseArray: any = [];

  jsonArray : any = [
    { name: "Name", type: "text", value:"", id:"1" },
    { name: "Password", type: "password", value:"", id:"2" },
    { name: "Pan", type: "text", value:"", id:"3" },
    { name: "Email", type: "email", value:"", id:"4" },
    { name: "Role", type: "dropdown", option: ["Admin", "Master","Lab", "User"], value:"", id:"5" }
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

  responseData(data: any) {
    let responseExistFlag = false;
    let responsePosition: any;
    console.log(data);
    // check if responseArray is empty
    if(this.responseArray.length) {

      //check if response id exists, then update response
      for(let i = 0; i<this.responseArray.length; i++) {
        if(this.responseArray[i].id+"" === data.id+"" ) {
          responseExistFlag = true;
          responsePosition = i;
          break;
        } else {
          this.responseArray.push(data);
          console.log(this.responseArray);
        }
      }
    } else {
      this.responseArray.push(data);
      console.log(this.responseArray);
    }

    // if response already exits, update value
    if(responseExistFlag) {
      this.responseArray[responsePosition].value = data.value;
      responseExistFlag = false;
      responsePosition = null;
      console.log(this.responseArray);
    }
  }

  submitForm() {
    console.log(this.responseArray);
  }

}
