import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-repetitive-table-row',
  templateUrl: './repetitive-table-row.component.html',
  styleUrls: ['./repetitive-table-row.component.less']
})

export class RepetitiveTableRowComponent {
  @Input() rowConfig: any[];
  @Input() order = false;
  @Output() inputChange = new EventEmitter<any>();
  @Output() rowAction = new EventEmitter<any>();

  onInput(event, model) {
    this.inputChange.emit({value: event, model: model});
  }

  onRowAction(action) {
    this.rowAction.emit({action: action, row: this.rowConfig});
  }
}


// todo finish interface
export interface RowConfig {
  component: 'input' | 'button'| 'text'| 'table';
  model: string; // component identifier
  type?: string; // if component if input, refers to input type
  value?: string; // init input or text components

  action?: string; // button specefic : action name : required for button
  btnText?: string; // button specefic : button render text
}
