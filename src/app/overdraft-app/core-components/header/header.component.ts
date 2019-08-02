import {Component, Input} from '@angular/core';
import {TabInterface} from '../../../lib/atoms/tabs/tabs.component';
import {customizeNumberService} from '../../../lib/services/customize-number.service';
import {budget} from '../../dal/banks/bank-data.models';
import {singularOverdraftLimitationMax} from '../../dal/banks/bank-data.models';
import {currentBank} from '../../dal/banks/bank-data.models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})

export class HeaderComponent {
    overdraftWithGracePeriodAmount = customizeNumberService(budget);
    @Input() currency = 'amd';
    singularOverdraftLimitationMax = singularOverdraftLimitationMax;
    currentBank = currentBank;


    tabs: TabInterface[] = [
        {
            link: 'pick-overdraft-type',
            text: 'Raise overdraft'
        },
        {
            link: 'customer-profile',
            text: 'Your profile'
        },
        {
            link: 'my-overdrafts',
            text: 'My overdrafts'
        },
    ];
}