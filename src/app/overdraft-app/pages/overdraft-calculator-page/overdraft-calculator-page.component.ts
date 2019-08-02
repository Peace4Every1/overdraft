import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {budget, singularOverdraftLimitationMax, singularOverdraftLimitationMin} from '../../dal/banks/bank-data.models';
import {AlertBoxService} from '../../../lib/atoms/alert-box/alert-box.service';
import {convertToTimeStamp, stampConvertToDate} from '../../../lib/services/date.service';

const STATES = {
    INIT: 'INIT',
    SALARY: 'SALARY',
    OVERDRAFTOPTION: 'OVERDRAFTOPTION',
    GETSALARYTHROUGHBANK: 'GETSALARYTHROUGHBANK'
};

@Component({
    selector: 'app-overdraft-calculator-page',
    templateUrl: './overdraft-calculator-page.component.html',
    styleUrls: ['./overdraft-calculator-page.component.less']
})

export class OverdraftCalculatorPageComponent implements OnInit {
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
            model: 'startDate',
            validationRules: [
                {
                    rule: 'required'
                }
            ]
        },
        {
            component: 'date',
            model: 'endDate',
            validationRules: [
                {
                    rule: 'required'
                }
            ]
        }
    ];

    salary;
    n = '{n}';
    ratio;

    startDate = null;
    endDate = null;

    constructor(private router: Router,
                private alertBoxService: AlertBoxService,
                private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe( queryParam => {
            if (queryParam.salary) {
                this.salary = queryParam.salary;
                this.fieldConfig_salary[0]['value'] = this.salary ;
                this.calcSalary(this.salary);
                this.initOverdraftOptions();
                this.state = STATES.SALARY;
            }

            if (queryParam.ratio) {
                this.ratio = queryParam.ratio;
                const selectedOption = this.fieldConfig_options[0]['selectOptions'].find( o => {
                    return o.key === queryParam.ratio;
                });
                selectedOption['selected'] = true;
                this.onselectOption(selectedOption);
                this.state = STATES.OVERDRAFTOPTION;
            }

            if (queryParam.startDate) {
                const startDate = stampConvertToDate(+queryParam.startDate);
                this.fieldConfig_gracePeriod[0]['selectedDate'] = startDate;
            }

            if (queryParam.endDate) {
                const endDate = stampConvertToDate(+queryParam.endDate);
                this.fieldConfig_gracePeriod[1]['selectedDate'] = endDate;
            }

            if (queryParam.startDate && queryParam.endDate) {
                this.state = STATES.GETSALARYTHROUGHBANK;
            }
        });
    }

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

        if (state === STATES.GETSALARYTHROUGHBANK ) {
          this.state = STATES.OVERDRAFTOPTION;
        }
    }

    // salary block
    calcSalary(salaryAmount) {
        let ratio = budget / salaryAmount;

        if (isNaN(ratio)) {
            return;
        }

        this.fieldConfig_salary.map( f => {
            if (f.model === 'salary') {
                f['value'] = salaryAmount;
            }
        });

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

        this.salary = salaryAmount;
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

            this.router.navigate(['/overdraft-calculator'],
                { queryParams: { salary: this.salary + ''}});
        }
    }


    // overdaft rate options block
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

        this.n = '{n}';
    }

    initOverdraftOptions() {
        // debugger
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

    onselectOption(event) {
        // debugger

        this.fieldConfig_options[0]['selectedOptions'] = [];
        this.fieldConfig_options[0].selectOptions.map( o => {
            if (o.selected) {
                this.fieldConfig_options[0]['selectionPlaceholder'] = o.value;
                this.fieldConfig_options[0]['selectedOptions'].push(o);
            }
        });
    }

    onOptionSubmission(event) {
        if (event.errorCount === 0) {
           this.state = STATES.OVERDRAFTOPTION;

           this.ratio = this.fieldConfig_options[0]['selectedOptions'][0]['key'] + '';
           this.router.navigate(['/overdraft-calculator'],
                                    { queryParams: { salary: this.salary + '', ratio: this.ratio}});
        }
    }

    // grace period block
    onSelectDate(event) {
        const model = event['model'];
        const value = event['value'];
        this[model] = value;
    }

    onPeriodsSubmission(event) {
        if (!this.startDate || !this.endDate) {
            this.alertBoxService.initMsg({type: 'error', text: 'Please pick both dates'});
            return;
        }

        const startDate = convertToTimeStamp(this.startDate);
        const endDate = convertToTimeStamp(this.endDate);

        if (startDate > endDate) {
            this.alertBoxService.initMsg({type: 'error', text: 'End date can\'t be earlier' });
            return;
        }

        this.state = STATES.GETSALARYTHROUGHBANK;
        this.router.navigate(['/overdraft-calculator'],
            { queryParams: { salary: this.salary + '',
                                    ratio: this.ratio,
                                    startDate: startDate,
                                    endDate: endDate}});
    }
}