import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-date-picker',
  templateUrl: './input-date-picker.component.html',
  styleUrls: ['./input-date-picker.component.scss']
})
export class InputDatePickerComponent implements OnInit {

  @Input() json:any;
  @Input() id: any;
  @Output() responseData = new EventEmitter<any>();
  value: any;

  constructor() { }

  ngOnInit() {}

  getVal() {
    this.json.value = new Date(this.value).getTime();
    this.responseData.emit(this.json);
  }

}
