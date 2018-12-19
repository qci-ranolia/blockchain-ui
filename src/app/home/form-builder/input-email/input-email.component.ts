import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss']
})
export class InputEmailComponent implements OnInit {

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
