import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormValidatorService} from '../../services/form-validator.service';

@Component({
  selector: 'app-repetitive-table',
  templateUrl: './repetitive-table.component.html',
  styleUrls: ['./repetitive-table.component.less']
})

export class RepetitiveTableComponent implements OnInit, OnChanges {
  @Input() showTable = true;
  @Input() order = false;

  // row
  @Input() rowConfig = [];
  @Input() rowStartCount = 1;

  rowErrCount = 0;
  rowTouched = false;
  tableRowArr = [];

  @Output() rowAction = new EventEmitter();


  // add row input and button
  @Input() addRowInputCount = 1;
  @Input() addRowInputCountText = '';
  addRowInputHasErr = false;
  @Input() addRowInputErrMsg = 'Only positive number allowed';
  @Input() addRowInputIconClass = '';
  @Input() addRowInputLeftIcon = false;
  @Input() addRowInputRightIcon = false;
  @Input() addRowBtnText = 'Add Row';
  @Input() addRowBtnTextClass = '';
  @Input() addRowBtnTextLeftIcon = false;
  @Input() addRowBtnTextRightIcon = false;

  constructor(private formValidatorService: FormValidatorService) {}

  ngOnInit() {
    if (this.rowConfig) {
      let index = 0;

      while (this.rowStartCount) {
        const cloneConfig = JSON.stringify(this.rowConfig);
        const _cloneConfig = JSON.parse(cloneConfig);

        this.tableRowArr.push({rowIndex: index, rowConfig: _cloneConfig});
        this.rowStartCount--;
        index++;
      }
    }
  }

  ngOnChanges() {
    // alert('change')
  }

  // row elements
  onInput(event, rowIndex) {
    this.tableRowArr[rowIndex].rowConfig.map( rowItem => {
      if (rowItem.model === event.model) {
        rowItem.value = event.value;
      }

      if (rowItem.component === 'input' && this.rowTouched) {
        this.validateField(rowItem);
      }
    });
  }

  onRowAction(event, index) {
    this.rowTouched = true;
    this.rowErrCount = 0;
    event.row.map( item => {
      if (item.component === 'input') {
        this.validateField(item);
      }
    });
    const emitData = {
      errCount: this.rowErrCount,
      ...event,
      index: index,
      tableRowArr: this.tableRowArr,
    };

    this.rowAction.emit(emitData);
  }

  validateField(field) {
    const fieldhasErr = this.formValidatorService.validateField(field);

    if (fieldhasErr) {
      this.rowErrCount++;
    }
  }


  // add row functionality
  onAddRowInputChange (event) {
    this.addRowInputCount = 1;
    if (event > 1 ) {
      this.addRowInputCount = event;
    }
  }

  onAddRow() {
    let counter = this.addRowInputCount;
    let index = this.tableRowArr[this.tableRowArr.length - 1]['rowIndex'] + 1;
    while (counter) {
      const cloneConfig = JSON.stringify(this.rowConfig);
      const _cloneConfig = JSON.parse(cloneConfig);

      this.tableRowArr.push({rowIndex: index, rowConfig: _cloneConfig});
      counter--;
      index++;

      if (counter === 0) {
        this.addRowInputCount = 1;
      }
    }
  }
}
