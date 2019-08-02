import {
    Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output,
    ViewChild
} from '@angular/core';

@Component({
  selector: 'app-select-autocomplete',
  templateUrl: 'select-autocomplete.component.html',
  styleUrls: ['select-autocomplete.component.less']
})

export class SelectAutocompleteComponent implements OnInit, OnChanges {
  // select !!readonly input
  @Input() selectionPlaceholder: string;
  @Input() selectionLabel: string;
  @Input() selectedOptions: SelectOption[] = [];
  @Input() selectedOptionsRender: string;

  @Input() selectionHassErr: boolean;
  @Input() selectionErrMsg: string;

  @Input() selectionIconClass: string;
  @Input() selectionLeftIcon: boolean;
  @Input() selectionRightIcon: boolean;


  // options :: dropdown
  @Input() selectOptions: SelectOption[] = [
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
  optionsVisible = false;

  // autocomplete
  @Input() hasAutocomplete = false;
  @Input() autocompletePlaceholder: string;
  @Input() autocompleteValue: string;
  @Input() autocompleteHassErr: boolean;
  @Input() autocompleteErrMsg: string;
  @Input() autocompleteIconClass: string;
  @Input() autocompleteLeftIcon: boolean;
  @Input() autocompleteRightIcon: boolean;

  autocompleteOptions = [];

  // miltiselect
  @Input() isMultiselect = false;

  // grab from html element with id select && pass it to property selectEl :: click outside element
  @ViewChild('select', {read: ElementRef}) selectEl: ElementRef;

  @Output() optionSelect = new EventEmitter<SelectOption[]>();

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.selectedOptions.map(option => {
      this.renderSelectedOptions(option);
    });

    if (this.hasAutocomplete) {
      this.autocompleteOptions = JSON.parse(JSON.stringify(this.selectOptions));
    }
  }

  ngOnChanges() {
      this.selectedOptions.map(option => {
          this.renderSelectedOptions(option);
      });
  }

  toggleSelect(event) {
    this.optionsVisible = !this.optionsVisible;
  }

  selectOption(key) {
    this.selectOptions.map( option => {
      option.selected = false;

      if (option.key === key) {
        option.selected = true;
        this.renderSelectedOptions(option);

        this.optionsVisible = false;

        this.optionSelect.emit(this.selectedOptions);
      }
    });
  }

  onAutocomplete(event) {
    this.selectOptions = [];

    if (!event) {
      this.selectOptions = this.autocompleteOptions;
      return;
    }

    this.autocompleteOptions.map( option => {
      const searchedStr = event.toLowerCase();
      const optionValue = option.value.toLocaleLowerCase();

      if (optionValue.indexOf(searchedStr) >= 0 ) {
        this.selectOptions.push(option);
      }
    });

    if (!this.selectOptions.length) {
      this.autocompleteHassErr = true;
    } else {
      this.autocompleteHassErr = false;
    }
  }

  renderSelectedOptions(option) {
    this.selectedOptions = [];
    this.selectedOptions.push(option);
    this.selectedOptionsRender = null;
    if (!this.selectedOptionsRender) {
      this.selectedOptionsRender = option.value;
    } else {
      this.selectedOptionsRender += ', ' + option.value;
    }
  }

  @HostListener('document:click', ['$event'])
  click(event) {
    if ( this.optionsVisible && !this.selectEl.nativeElement.contains(event.target)) {
      this.optionsVisible = false;

      this.optionSelect.emit(this.selectedOptions);
    }
  }
}

export interface SelectOption {
  key: string;
  value: string;
  selected?: boolean;
}
