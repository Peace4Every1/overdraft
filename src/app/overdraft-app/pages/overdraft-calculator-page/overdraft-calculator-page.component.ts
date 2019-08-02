import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {budget, singularOverdraftLimitationMax, singularOverdraftLimitationMin} from '../../dal/banks/bank-data.models';
import {AlertBoxService} from '../../../lib/atoms/alert-box/alert-box.service';

const STATES = {
    INIT: 'INIT',
    SALARY: 'SALARY',
    OVERDRAFTOPTION: 'OVERDRAFTOPTION'
};

@Component({
    selector: 'app-overdraft-calculator-page',
    templateUrl: './overdraft-calculator-page.component.html',
    styleUrls: ['./overdraft-calculator-page.component.less']
})

export class OverdraftCalculatorPageComponent {
    STATES = STATES;
    state = STATES.INIT;

    fieldConfig_salary = [
        {
            type: 'number',
            model: 'salary',
            placeholder : 'salary',
            iconClass: 'icon-user-outline',
            leftIcon: true,
            validationRules: [
                {
                    rule: 'required'
                },
                {
                    rule: 'pattern',
                    value: '^[1-9][0-9]{1,}$',
                    errMsg: 'Minimal acceptable salary is 100k amd'
                },
                {
                    rule: 'minLength',
                    value: 6,
                    errMsg: 'Salary must be at least 100.000 amd'
                },

            ]
        }
    ];
    fieldConfig_options = [
        {
            component: 'select',
            model: 'selectOverdraftOption',
            selectionPlaceholder: 'Select Overdraft Option',
            hasAutocomplete: true,
            selectOptions: [],
            validationRules: [
                {
                    rule: 'required'
                }
            ]
        }
    ];
    fieldConfig_gracePeriod = [
        {
            component: 'date',
            model: 'dateStart',
            validationRules: [
                {
                    rule: 'required'
                }
            ]
        },
        {
            component: 'date',
            model: 'dateEnd',
            validationRules: [
                {
                    rule: 'required'
                }
            ]
        }
    ];

    salary;
    n = '{n}';

    constructor(private router: Router,
                private alertBoxService: AlertBoxService) {}

    goStepBack(state) {
        if (state === STATES.INIT) {
            this.router.navigate(['/pick-overdraft-type']);
        }

        if (state === STATES.SALARY) {
          this.state = STATES.INIT;
          this.resetOptions();
        }

        if (state === STATES.OVERDRAFTOPTION) {
          this.state = STATES.SALARY;
        }
    }

    calcSalary(salaryAmount) {
        this.fieldConfig_salary.map( f => {
            if (f.model === 'salary') {
                f['value'] = salaryAmount;
            }
        });

        let ratio = budget / salaryAmount;

        if (salaryAmount) {
            if (ratio > singularOverdraftLimitationMax ) {
                this.n = singularOverdraftLimitationMax + '';
            } else {
                if (ratio.toString().indexOf('.')) {
                    ratio = Math.floor(ratio);
                }
                this.n = ratio + '';
            }
        } else {
            this.n = '{n}';
        }
    }

    onSalaryInput(event) {
        this.calcSalary(event);
    }

    onSalarySubmission(event) {
        if (event.errorCount === 0) {
            if (+this.n < singularOverdraftLimitationMin) {
                this.alertBoxService.initMsg({type: 'error', text: 'Your salary exceeds the amount bank can provide'});
                return;
            }

            this.state = STATES.SALARY;
            this.initOverdraftOptions();
        }
    }

    resetOptions() {
        this.fieldConfig_options = [
            {
                component: 'select',
                model: 'selectOverdraftOption',
                selectionPlaceholder: 'Select Overdraft Option',
                hasAutocomplete: true,
                selectOptions: [],
                validationRules: [
                    {
                        rule: 'required'
                    }
                ]
            }
        ];
    }

    initOverdraftOptions() {
        const options =  Array(+this.n).fill(0).map((x, i) => i);
        const optionsArray = [];

        this.fieldConfig_options[0].selectOptions = [];

        options.map( o => {
            if (o >= 1) {
                const op = +o + 1 + '';
                optionsArray.push({
                    key: op,
                    value: op + 'x times'
                });
            }
        });

        if (optionsArray.length === 1) {
            optionsArray[0].selected = true;
            this.fieldConfig_options[0]['selectedOptions'] = [];
            this.fieldConfig_options[0]['selectionPlaceholder'] = optionsArray[0].value;
            this.fieldConfig_options[0]['hasAutocomplete'] = false;
            this.fieldConfig_options[0]['selectedOptions'].push(optionsArray);
        }

        this.fieldConfig_options[0].selectOptions = optionsArray;
    }

    onOptionSubmission(event) {
        if (event.errorCount === 0) {
           this.state = STATES.OVERDRAFTOPTION;
        }
    }

    onSelectDate11(event) {
        // console.log(event);
    }

    onPeriodsSubmission(event) {
        this.router.navigate(['/auction']);
        if (event.errorCount === 0) {
            const startDay = new Date();
            this.router.navigate(['/auction']);
        }
    }
}