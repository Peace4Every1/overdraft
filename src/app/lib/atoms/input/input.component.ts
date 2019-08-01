import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})

export class InputComponent {
  // input data
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() value = null;

  // error handling
  @Input() hasErr = false;
  @Input() errMsg = '';

  // readonly
  @Input() readonly = false;

  // icon && position
  @Input() iconClass = '';
  @Input() leftIcon = false;
  @Input() rightIcon = false;

  @Output() inputChange = new EventEmitter<any>();
  @Output() inputClick = new EventEmitter<any>();

  onInput(event) {
    this.value = event.target.value;
    this.inputChange.emit(this.value);
  }

  onInputClick(event) {
    if ( this.readonly) {
      this.inputClick.emit(this.value);
    }
  }
}
