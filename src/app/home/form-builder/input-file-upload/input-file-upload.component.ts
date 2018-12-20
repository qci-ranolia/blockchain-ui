import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { sha256, sha224 } from 'js-sha256';

@Component({
  selector: 'app-input-file-upload',
  templateUrl: './input-file-upload.component.html',
  styleUrls: ['./input-file-upload.component.scss']
})
export class InputFileUploadComponent implements OnInit {

  @Input() json:any;
  @Input() id: any;
  @Output() responseData = new EventEmitter<any>();
  formData = new FormData();;
  files: any;
  disabled : any = false;
  name= "";
  constructor() { }

  ngOnInit() {
  }

  getVal($event) {

    this.formData.delete('file');
    this.files = $event.target.files || $event.srcElement.files;
    let file = this.files[0];
    let fileName = file.name;
    this.name = file.name;
    this.formData = new FormData();
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event:any) => {
      let temp : any = reader.result;
      this.json.value = temp.split(',')[1]+"";
      this.json.file_name = this.name;
      this.json.file_hash = sha224.hex(sha224(this.json.value));
      this.responseData.emit(this.json);
    }

  }

}
