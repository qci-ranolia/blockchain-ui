import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { APIService } from '../../service/APIService';
declare var jsSHA

@Component({
  selector: 'app-createasset',
  templateUrl: './createasset.component.html',
  styleUrls: ['./createasset.component.scss']
})
export class CreateassetComponent implements OnInit {
  asset : any
  files : any
  name  : any
  formData = new FormData()
  constructor(private location : Location, private _api : APIService) {
    // console.log(shaObj)
  }

  ngOnInit() {
  }

  refresh() : void {
    this.location.back()
  }
  addAsset(event){
    console.log(this.asset)
  }
  getVal($event){
    this.formData.delete('file')
    this.files = $event.target.files || $event.srcElement.files
    let file = this.files[0]
    let fileName = file.name
    this.name = file.name
    this.formData = new FormData()
    let reader = new FileReader()
    reader.readAsDataURL(file)
    var shaObj = new jsSHA("SHA-224", "TEXT")
    shaObj.update(reader.result)
    var hash = shaObj.getHash("HEX")
    console.log(reader.result)
    console.log(this.name)
    console.log(hash)
    // reader.onload = (event:any) => {
    //   this.json.value = reader.result;
    //   this.json.fileName = this.name;
    //   this.responseData.emit(this.json);
    // }
  }
}
