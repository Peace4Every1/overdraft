import {Component} from '@angular/core';
import {Router} from '@angular/router';

const STATES = {
    INIT: 'INIT',
    SALARY: 'SALARY',
    OVERDRAFTOPTION: 'OVERDRAFTOPTION'
}

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
                    value: '^[1-9]{1,}$',
                    errMsg: 'Field must be number of of at least 6 chars'
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
            selectOptions: [
                {
                    key: '1',
                    value: '1x'
                },
                {
                    key: '2',
                    value: '2x'
                },
                {
                    key: '3',
                    value: '3x'
                },
                {
                    key: '4',
                    value: '4x'
                },
            ],
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

    constructor(private router: Router) {}

    goStepBack(state) {
        if (state === STATES.INIT) {
            this.router.navigate(['/pick-overdraft-type']);
        }

        if (state === STATES.SALARY) {
          this.state = STATES.INIT;
        }

        if (state === STATES.OVERDRAFTOPTION) {
          this.state = STATES.SALARY;
        }
    }

    onSalarySubmission(event) {
        if (event.errorCount === 0) {
           this.state = STATES.SALARY;

        }
    }

    onOptionSubmission(event) {
        if (event.errorCount === 0) {
           this.state = STATES.OVERDRAFTOPTION;
        }
    }

    onPeriodsSubmission(event) {
        this.router.navigate(['/auction']);
        if (event.errorCount === 0) {
            alert(333)
           this.router.navigate(['/auction']);
        }
    }
}