import {Injectable} from '@angular/core';

@Injectable()
export class OverdratfService {
    overdraftAmount;
    ovardraftPerUser;


    updateOverdraftAmount(amount) {
        this.overdraftAmount = amount;
    }

    updateOvardraftPerUser(ovardraftPerUser) {
        this.ovardraftPerUser = ovardraftPerUser;
    }
}