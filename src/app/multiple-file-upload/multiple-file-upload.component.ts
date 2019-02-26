import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.scss']
})

export class MultipleFileUploadComponent implements OnInit {
  @ViewChild('myPond') myPond: any;
  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Drop files here ...',
    acceptedFileTypes: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf'
  }

  pondFiles = []

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log(event)
    const formData = new FormData();
    // formData.append(event);
    console.log(formData)

  }

  // constructor() {
  // }

  ngOnInit() {
  }

}
