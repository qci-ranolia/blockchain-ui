import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

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
