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
  jsonArray : any = [];
  formName: any = "";
  formSubmitUrl: any="";

  // jsonArray : any = [
  //   { name: "Name", type: "text", value:"", id:"1" },
  //   { name: "Password", type: "password", value:"", id:"2" },
  //   { name: "Pan", type: "text", value:"", id:"3" },
  //   { name: "Email", type: "email", value:"", id:"4" },
  //   { name: "Role", type: "dropdown", option: ["Admin", "Master","Lab", "User"], value:"", id:"5" }
  // ];

  constructor(private ProjectService: ProjectService) {

    this.ProjectService.emitHideFormBuilder.subscribe(res=>{

      this.jsonArray =  this.ProjectService.formElements.formElements;
      this.formName =  this.ProjectService.formElements.formName;
      this.formSubmitUrl = this.ProjectService.formElements.formSubmitUrl;

      console.log(this.jsonArray);
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

    let exists = false;
    let pos = null;

    console.log(data);
    console.log(this.responseArray);
    // check if responseArray is empty
    if(this.responseArray.length>0) {

      for(let i = 0; i<this.responseArray.length; i++) {

        //check if response id exists, then update response
        // if response already exits, update value
        if(this.responseArray[i].id == data.id ) {

          exists = true;
          pos = i;
          break;
        }
      }
    } else {
      this.responseArray.push(data);
      console.log("first entry");
      console.log(this.responseArray);
      exists = true;
    }

    if(exists) {
      if(pos) {
        this.responseArray[pos].value = data.value;
      }
    } else {
      this.responseArray.push(data);
    }

  }

  submitForm() {
    let res = [];
    let responseData : any ={};
    for(let i=0; i<this.responseArray.length; i++) {
      // res.append( ""+this.responseArray[i].parms+" : "+this.responseArray[i].value+"" )
      res.push({[this.responseArray[i].parms]: this.responseArray[i].value});

      if(this.responseArray[i].type==="file") {
        this.responseArray.push({parms:"file_name", value: this.responseArray[i].file_name});
        this.responseArray.push({parms:"file_hash", value: this.responseArray[i].file_hash});
      }

    }

    let mapped;

    mapped = this.responseArray.map(item => ({ [item.parms]: item.value }) );
    responseData = Object.assign({}, ...mapped );
    responseData = JSON.stringify(responseData);

    console.log(responseData);
    console.log(this.responseArray);
    console.log(this.formSubmitUrl);
    this.ProjectService.submitForm(responseData, this.formSubmitUrl);

  }

}
