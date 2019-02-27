import { Component, OnInit, ViewChild } from '@angular/core';
import { BloomFilter } from 'bloom-filters'

@Component({
  selector: 'app-multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.scss']
})

export class MultipleFileUploadComponent implements OnInit {
  @ViewChild('file') file
  public files: Set<File> = new Set()
  fileBrowseText = 'Browse';
  isFilesPresent : boolean = false;
  filesArr : any = new Object()
  fileNames = []
  // constructor() { }
  
  
  fileBrowse() {
    this.file.nativeElement.click()
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files
    let length : any = files.length
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.filesArr.push( key, files[key])
        console.log(this.filesArr)

        // for (let i = 0; i < length; i++){
        //   console.log(files[key].name)
        //   // console.log(files[key])
        // }
        // console.log(files[key])
      }
    }
    // var uniqueNames = this.fileNames.filter(function(name, index, array) {
    //   return index === array.indexOf(name)
    // })
    
    // this.fileNames = uniqueNames
    // console.log(this.files)
    // console.log(this.fileNames)
    this.isFilesPresent = true
  }

  removeFile(i){
    // this.file.nativeElement.files.splice(this.file.nativeElement.files[i])
    console.log(this.file.nativeElement.files)
  }

  ngOnInit() {
  }

}