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

        if (salaryAmount) {
            if (budget / salaryAmount > singularOverdraftLimitationMax ) {
                this.n = singularOverdraftLimitationMax + '';
            } else {
                this.n = budget / salaryAmount + '';
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

    initOverdraftOptions() {
        const options =  Array(+this.n).fill(0).map((x, i) => i);

        this.fieldConfig_options[0].selectOptions = [];

        options.map( o => {
            const op = +o + 1 + '';
            this.fieldConfig_options[0].selectOptions.push({
                key: op,
                value: op + 'x times'
            });
        });
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