import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-pick-overdraft-type-page',
    templateUrl: './pick-overdraft-type-page.component.html',
    styleUrls: ['./pick-overdraft-type-page.component.less']
})

export class PickOverdraftTypePageComponent {
    classicOverdraft = 'classicOverdraft';
    classicOverdraftBtn = 'Classic overdraft';

    overdraftWithGracePeriod = 'overdraftWithGracePeriod';
    overdraftWithGracePeriodBtn = 'Overdraft with grace reriod';

    constructor(private router: Router) {}

    pickOverdraftType(type) {
        if (type === this.classicOverdraft) {
            alert('the application will take u to classic overdraft option page');
        }

        if (type === this.overdraftWithGracePeriod) {
            this.router.navigate(['/overdraft-calculator']); // todo right route
        }
    }
}