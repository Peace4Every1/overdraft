import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: 'radio-button.component.html',
  styleUrls: ['radio-button.component.less']
})

export class RadioButtonComponent {
  @Input() radioButtonOptions: RadioButtonOption[] = [
    {
      key: '1',
      value: 'Test data'
    },
    {
      key: '2',
      value: 'Another test data'
    },
    {
      key: '3',
      value: 'Final test data'
    }
  ];
  @Input() radioButtonSelectedOptions: RadioButtonOption[] = [];

  @Output() radioButtonSelectOption = new EventEmitter<RadioButtonOption[]>();

  @Input() hasErr = false;
  @Input() errMsg = '';


  onSelectOption(key) {
    this.radioButtonOptions.map( option => {
      option.selected = false;

      if (option.key === key) {
        option.selected = true;
      }
    });

    this.radioButtonSelectOption.emit(this.radioButtonSelectedOptions);
  }
}

export interface RadioButtonOption {
  key: string;
  value: string;
  selected?: boolean;
  group?: string;
}
