import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less']
})

export class CheckboxComponent {
  @Input() checkboxOptions: CheckboxOption[] = [
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

  @Output() checkboxSelectOption = new EventEmitter<CheckboxOption[]>();

  @Input() hasErr = false;
  @Input() errMsg = '';

  onSelectOption(key) {
    this.checkboxOptions.map( option => {
      if (option.key === key) {
        option.selected = !option.selected;
      }
    });

    this.checkboxSelectOption.emit(this.checkboxOptions);
  }
}

export interface CheckboxOption {
  key: string;
  value: string;
  selected?: boolean;
  group?: string;
}
