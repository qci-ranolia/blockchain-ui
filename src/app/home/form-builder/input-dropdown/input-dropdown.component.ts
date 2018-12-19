import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.scss']
})
export class InputDropdownComponent implements OnInit {

  @Input() json: any;
  @Output() responseData = new EventEmitter<any>();
  selectedValue: any;

  constructor() { }

  ngOnInit() {
    this.selectedValue = this.json.value;
  }

  getVal() {
    this.json.value = this.selectedValue;
    this.responseData.emit(this.json);
  }

}
