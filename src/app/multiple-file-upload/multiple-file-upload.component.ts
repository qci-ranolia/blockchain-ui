import { Component, OnInit, ViewChild } from '@angular/core';
import { BloomFilter } from 'bloom-filters'
import { forkJoin, Observable, Subject } from 'rxjs'
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.scss']
})

export class MultipleFileUploadComponent implements OnInit {
  @ViewChild('file') file
  @ViewChild('text') text
  public files: Set<File> = new Set()
  fileBrowseText = 'Browse';
  fileUploadText = 'Upload';
  isFilesPresent : boolean = false;
  isTextToShow : boolean = true;
  isUploadActivated : boolean = true;
  textToShowHere: any
  filesArr : any = new Array()
  fileNames = []
  
  progress
  canBeClosed = true
  primaryButtonText = 'Upload'
  showCancelButton = true
  uploading = false
  uploadSuccessful = false

  constructor( private httpClient: HttpClient ) { }
  
  fileBrowse() {
    this.file.nativeElement.click()
  }

  onFilesAdded() {
    this.files = new Set()
    const files: { [key: string]: File } = this.file.nativeElement.files
    let length : any = files.length
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key])
        this.filesArr = this.files
      }
    }
    this.isTextToShow = false
    this.textToShowHere = length + ' files added. Please provide 18 digit ULR number and upload data.';
    setTimeout( () => {
      this.isTextToShow = false
      this.textToShowHere = ''
    }, 10000);
    this.isFilesPresent = true
    this.isUploadActivated = false
  }

  // removeFile(i){
  //   console.log(this.filesArr)
  // }

  onULRAdded(){
    if ( (this.text.nativeElement.value).length !== 18 ){
      this.isTextToShow = false
      this.textToShowHere = 'Please provide valid 18 digit ULR number and try again.'; 
      setTimeout( () => {
        this.isTextToShow = false
        this.textToShowHere = ''
      }, 10000);
    }
    // console.log((this.text.nativeElement.value).length);
  }

  upload() {
    // if everything was uploaded already, just close the dialog
    if ( this.uploadSuccessful ) {
      ////////////// return this.dialogRef.close()
    }
    // set the component state to "uploading"
    this.uploading = true
    // start the upload and save the progress map
    this.progress = this.newFunction(this.files)
    // convert the progress map into an array
    let allProgressObservables = []
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress)
    }
    // Adjust the state variables
    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish'
    // The dialog should not be closed while uploading
    this.canBeClosed = false
    ////////////// this.dialogRef.disableClose = true
    // Hide the cancel-button
    this.showCancelButton = false
    // When all progress-observables are completed . . .
    forkJoin(allProgressObservables).subscribe(end => {
      // . . . the dialog can be closed again . . .
      this.canBeClosed = true
      ///////////////// this.dialogRef.disableClose = false
      // . . . the upload was successful . . .
      this.uploadSuccessful = true
      // . . . and the component is no longer uploading
      this.uploading = false
      ////////////////// this.api.getHoliday()
    })
  }


  newFunction(files: Set<File>): { [key: string]: Observable<number> }{
    // create a const to capture/record status of file
    const status = {}
    // for each files
    files.forEach(file => {
      const formData: FormData = new FormData()
      formData.append('file', file)
      console.log(formData)
      // const req = new HttpRequest('POST', 'this.URL', formData, {
      //   reportProgress: true
      // })
      // const progress = new Subject<number>()
      // this.httpClient.request(req).subscribe(event => {
      //   if (event.type === HttpEventType.UploadProgress) {
      //     const percentDone = Math.round(100 * event.loaded / event.total)
      //     progress.next(percentDone)
      //   } else if (event instanceof HttpResponse) {
      //     progress.complete()
      //   }
      // })
      // status[file.name] = { progress: progress.asObservable() }
    })
    return status
  }
  
  ngOnInit() {
  }

}