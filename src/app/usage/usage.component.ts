import { Component } from '@angular/core';
import { FormValidatorService} from '../lib/services/form-validator.service';
import {isLineBreak} from 'codelyzer/angular/sourceMappingVisitor';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.less']
})

export class UsageComponent {
  // ---------forms
  fieldGroupingConfig = ['group-1', 'group-2'];
  fieldConfig = [
    {
      type: 'text',
      model: 'name',
      placeholder : 'name',
      validationRules: [
        {
          rule: 'required'
        },
        {
          rule: 'minLength',
          value: 4,
          errMsg: 'some custom text: at least 4 chars'
        }
      ]
    },
    {
      type: 'number',
      model: 'age',
      placeholder : 'age',
      validationRules: [
        {
          rule: 'required'
        }
      ]
    },
    {
      type: 'number',
      model: 'height',
      placeholder : 'height : custom pattern',
      validationRules: [
        {
          rule: 'pattern',
          value: '[1-9]{1}[0-9]{2}$',
          errMsg: 'Field must be number of max 3 chars'
        }
      ]
    },
    {
      type: 'email',
      model: 'email',
      placeholder : 'email',
    }
  ];
  sendBtnText = 'Send data';

  fieldGroupingConfig_2 = ['group-1', 'group-2'];
  fieldConfig_2 = [
    {
      group: 'group-1',
      type: 'text',
      model: 'name',
      placeholder : 'name',
      iconClass: 'icon-user-outline',
      leftIcon: true,
      validationRules: [
        {
          rule: 'required'
        },
        {
          rule: 'minLength',
          value: 4,
          errMsg: 'some custom text'
        }
      ]
    },
    {
      group: 'group-2',
      type: 'email',
      model: 'email',
      placeholder : 'email',
      iconClass: 'icon-mail',
      rightIcon: true,
    },
    {
      group: 'group-2',
      type: 'phone',
      model: 'phone',
      placeholder : 'phone',
      iconClass: 'icon-phone-outline',
      rightIcon: true,
    }
  ];

  fieldGroupingConfig_3 = ['group-1', 'group-2', 'group-3', 'group-4', 'group-5'];
  fieldConfig_3 = [
    {
      group: 'group-1',
      type: 'text',
      model: 'name',
      placeholder : 'name',
      validationRules: [
        {
          rule: 'required'
        },
        {
          rule: 'minLength',
          value: 4,
          errMsg: 'some custom text'
        }
      ]
    },
    {
      group: 'group-1',
      type: 'number',
      model: 'age',
      placeholder : 'age',
      validationRules: [
        {
          rule: 'required'
        }
      ]
    },
    {
      group: 'group-2',
      type: 'number',
      model: 'height',
      placeholder : 'height : custom pattern',
      validationRules: [
        {
          rule: 'pattern',
          value: '[1-9]{1}[0-9]{2}$',
          errMsg: 'Field must be number of max 3 chars'
        }
      ]
    },
    {
      group: 'group-2',
      type: 'email',
      model: 'email',
      placeholder : 'email',
    },
    {
      group: 'group-3',
      component: 'select',
      model: 'selectFruits',
      selectionPlaceholder: 'Choose fruit',
      hasAutocomplete: true,
      selectOptions: [
        {
          key: '1',
          value: 'Apple'
        },
        {
          key: '2',
          value: 'Orange'
        },
        {
          key: '3',
          value: 'Apricot'
        },
        {
          key: '4',
          value: 'Pinaple'
        },
        {
          key: '5',
          value: 'Strawberry'
        },
        {
          key: '6',
          value: 'Banana'
        },
        {
          key: '7',
          value: 'Mango'
        },
        {
          key: '8',
          value: 'Kiwi'
        }
      ],
      validationRules: [
        {
          rule: 'required'
        }
      ]
    },
    {
      group: 'group-3',
      component: 'select',
      model: 'selectTechProvider',
      selectionPlaceholder: 'Select company',
      hasAutocomplete: true,
      selectOptions: [
        {
          key: '1',
          value: 'Apple'
        },
        {
          key: '2',
          value: 'Samsung'
        },
        {
          key: '3',
          value: 'LG'
        },
        {
          key: '4',
          value: 'Philips'
        },
        {
          key: '5',
          value: 'Strawberry'
        },
        {
          key: '6',
          selected: true,
          value: 'Sony'
        },
      ],
      validationRules: [
        {
          rule: 'required'
        }
      ]
    },
    {
      group: 'group-3',
      component: 'select',
      model: 'testSelect',
      selectOptions: [
        {
          key: '1',
          value: 'Test data long text blyaaaaaaaaaaa'
        },
        {
          key: '2',
          value: 'Another test data'
        },
        {
          key: '3',
          value: 'Final test data'
        }
      ],
    },
    {
      group: 'group-3',
      component: 'select',
      model: 'multiSelect',
      selectionPlaceholder: 'Multi Select',
      hasAutocomplete: true,
      isMultiselect: true,
      selectOptions: [
        {
          key: '1',
          value: 'Test long text blyaaaaaaaaaaa'
        },
        {
          key: '2',
          value: 'Another test data'
        },
        {
          key: '3',
          value: 'Final test data'
        }
      ],
    },
    {
      group: 'group-4',
      component: 'radio',
      model: 'gender',
      selectOptions: [
        {
          key: '1',
          value: 'Female'
        },
        {
          key: '2',
          value: 'Male'
        }
      ],
      validationRules: [
        {
          rule: 'required'
        }
      ]
    },
    {
      group: 'group-4',
      component: 'radio',
      model: 'ageGroup',
      selectOptions: [
        {
          key: '1',
          value: 'Teenager'
        },
        {
          key: '2',
          value: 'Young pan',
          selected: true,
        },
        {
          key: '3',
          value: '35+ years'
        }
      ],
    },
    {
      group: 'group-4',
      component: 'checkbox',
      model: 'cars',
      selectOptions: [
        {
          key: '1',
          value: 'BMW',
          selected: true,
        },
        {
          key: '2',
          value: 'Opel'
        },
        {
          key: '3',
          value: 'Kadilac',
          selected: true,
        },
        {
          key: '4',
          value: 'Mersedes',
          selected: true,
        },
        {
          key: '5',
          value: 'Peugeot'
        },
        {
          key: '6',
          value: 'Niva'
        }
      ],
      validationRules: [
        {
          rule: 'required'
        },
        {
          rule: 'minLength',
          value: 3,
          errMsg: 'At least 3 items must be checked'
        },
      ]
    },
    {
      group: 'group-5',
      component: 'file',
      model: 'images',
      allowMultiple: true,
      acceptTypes: '.png, .jpg',
      uploadBtnTextIconClass: 'icon-attachment',
      uploadBtnText: 'Attach images',
      files: [],
      validationRules: [
        {
          rule: 'required'
        },
        {
          rule: 'minLength',
          value: 4,
          errMsg: 'At least 4 files must be attached'
        },
        {
          rule: 'maxLength',
          value: 5,
          errMsg: 'U can attach max 5 files'
        }
      ]
    },
    {
      group: 'group-5',
      component: 'file',
      model: 'pdf',
      acceptTypes: '.pdf',
      uploadBtnTextIconClass: 'icon-attachment',
      uploadBtnText: 'Attach pdf',
      files: [],
      validationRules: [
        {
          rule: 'required'
        }
      ]
    }
  ];


  // ---------repetitive table
  rowConfig = [
    {
      component: 'input',
      type: 'number',
      model: 'operand-1'
    },
    {
      component: 'input',
      type: 'number',
      model: 'operand-2'
    },
    {
      component: 'text',
      model: 'sum'
    },
    {
      component: 'text',
      model: 'diff'
    },
    {
      component: 'table',
      model: 'table',
      rowConfig: [
        {
          component: 'input',
          type: 'number',
          model: 'operand-1'
        }
      ],
      rowStartCount: 4,
      showTable: false
    },
    {
      component: 'button',
      action: 'calculate',
      btnText: 'Calculate'
    },
    {
      component: 'button',
      action: 'delete',
      btnText: 'Delete row'
    },
    {
      component: 'button',
      action: 'newTable',
      btnText: 'Add new table'
    }
  ];
  rowStartCount = 2;
  order = true;

  // ---------forms methods
  onSend(event) {
    if (event.errorCount === 0 ) {
      alert('SUCCESS: form has no errors');
    }
  }

  // ---------repetitive table methods
  onRowAction(event) {
    if ( event.errCount ) {
      alert('ERROR: row has error');
      return;
    }

    if (event.action === 'calculate') {
      this.calculateRow(event);
    }

    if (event.action === 'delete') {
      this.deleteRow(event);
    }

    if (event.action === 'newTable') {
      this.addNewTable(event);
    }
  }

  calculateRow(event) {
    let sum = null, diff = 0;

    event.row.map( i => {
      if (i.component === 'input' && i.value) {
        sum += +i.value;

        if ( diff === 0) {
          diff += +i.value;
        } else {
          diff -= +i.value;
        }
      }
    });

    event.row.map( i => {
      if (i.model === 'sum') {
        i.value = sum;
      }
    });

    event.row.map( i => {
      if (i.model === 'diff') {
        i.value = diff;
      }
    });

    // console.log(this.rowConfig);
  }

  deleteRow(event) {
    if (event.tableRowArr.length === 1) {
      alert('WARNING: table must have at least 1 row');
      return;
    }

    event.tableRowArr.filter( (tableRow, index) => {
      if (event.index === tableRow.rowIndex) {
        event.tableRowArr.splice(index, 1);
      }
    });
  }

  addNewTable(event) {
    const rowConfig = [
      {
        component: 'input',
        type: 'number',
        model: 'operand-1'
      }
    ];

    event.row.map( row => {
      if (row.component === 'table') {
          // row['rowConfig'] = rowConfig;

          row['showTable'] = true;
      }
    });

  }
}


