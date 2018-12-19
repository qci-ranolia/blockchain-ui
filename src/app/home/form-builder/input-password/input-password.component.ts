import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent implements OnInit {

  @Input() json: any;
  @Input() id: number;
  @Output() responseData = new EventEmitter<any>();
  value: any;

  constructor() {}

  ngOnInit() {}

  getVal() {
    console.log(this.value);
    this.json.value = this.value;
    this.responseData.emit(this.json);
  }

}
