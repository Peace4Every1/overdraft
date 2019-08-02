import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormValidatorService, ValidationRules} from '../../services/form-validator.service';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.less']
})

export class FormGeneratorComponent implements OnInit {
  // fileds
  @Input() fieldConfig: FieldConfig[] = [];
  @Input() fieldGroupingConfig = ['default-group'];

  //
  @Output() inputAction = new EventEmitter();
  @Output() selectDate = new EventEmitter();
  @Output() selectOption = new EventEmitter();


  // cta
  @Input() sendBtnText =  '';
  @Input() sendBtnTextIconClass =  '';
  @Input() sendBtnTextIconClassLeftIcon = false;
  @Input() sendBtnTextIconClassRightIcon = false;
  @Output() send = new EventEmitter<any>();


  formErrCount = 0;
  formIsTouched = 0;

  constructor(private formValidatorService: FormValidatorService) {}

  ngOnInit() {
    this.fieldConfig.map( field => {
      if (field.selectOptions) {
        field.selectedOptions = [];
        field.selectOptions.map( option => {
          if (option.selected ) {
            field.selectedOptions.push(option);
          }
        });
      }
    });
  }

  // input : text, number, emeail, phone, url
  onInput(event, model) {
    // console.log(event);
    this.fieldConfig.filter( field => {
      if (field.model === model) {
        field.value = event;

        if (this.formIsTouched > 0) {
          if (this.formErrCount > 0 ) {
            this.formErrCount--;
          }
          this.validateField(field);
        }
      }
    });

    this.inputAction.emit(event);
  }

  validateField(field) {
    const hasErr = this.formValidatorService.validateField(field);

    if (hasErr) {
      this.formErrCount++;
    }
  }

  // file upload
  onFileUpload(event, model) {
    this.validatFileInput(event, model, false);
  }

  onDeleteFile(event, model) {
    this.validatFileInput(event, model, true);

    this.fieldConfig.map( field => {
      if ( field.component === 'file' && field.model === model ) {
        field.disable = false;
      }
    });
  }

  validatFileInput(event, model, AttachBtnState: boolean) {
    this.fieldConfig.map( field => {
      if ( field.component === 'file' && field.model === model ) {

        field.files = event;

        if ( field.allowMultiple && field.validationRules) {

          const validateFile = this.formValidatorService.validateField(field);
          const isValid = validateFile.isValid;

          if (!isValid) {
            return;
          }
        }

        if ( !field.allowMultiple ) {
          field.disable = true;
        }
      }
    });
  }

  // select
  onOptionSelect(event, model) {
    this.fieldConfig.map(field => {
      if (field.component === 'select' && field.model === model) {
        field.selectedOptions = [];

        event.map(option => {
          if (option.selected) {
            field.selectedOptions.push(event);
            this.formValidatorService.validateField(field);
          }
        });
      }
    });

    this.selectOption.emit(event);
  }

  // radio
  onRadioSelect(event, model) {
    this.fieldConfig.map( field => {
      if ( field.component === 'radio' && field.model === model ) {

        field.selectedOptions = [];
        field.selectedOptions.push(event);
        this.formValidatorService.validateField(field);
      }
    });
  }

  // checkbox
  onCheckboxSelect(event, model) {
    this.fieldConfig.map(field => {
      if (field.component === 'checkbox' && field.model === model) {
        field.selectedOptions = [];

        event.map(option => {
          if (option.selected) {
            field.selectedOptions.push(event);
            this.formValidatorService.validateField(field);
          }
        });
      }
    });
  }

  // date
  onSelectDate(event, model) {
    this.selectDate.emit({model: model, value: event});
  }

  // send form
  onSend() {
    this.formIsTouched++;
    this.formErrCount = 0;

    this.fieldConfig.map( field => {
      // full validation logic for input Types && required check up for rest types
      this.validateField(field);
    });

    this.send.emit({errorCount: this.formErrCount});
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      this.onSend();
    }
  }
}

export interface FieldConfig {
  group?: string;

  // simple input types
  type: 'text' | 'number' | 'email' | 'phone';
  model: string;
  value: any;
  readonly?: boolean;
  placeholder?: string;
  label?: string;
  hasErr: boolean;
  errMsg: any[];
  validationRules?: ValidationRules[];

  // file
  component?: 'input' | 'file'| 'select' | 'radio'| 'checkbox' ; // default input
  files: File[]; // file component specefic
  allowMultiple: boolean; // file component specefic

  // select
  selectOptions: any[];
  selectedOptions: any[];

  // disable field
  disable: boolean; // specefic to all
}


