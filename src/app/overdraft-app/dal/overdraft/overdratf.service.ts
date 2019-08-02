import {Injectable} from '@angular/core';

@Injectable()
export class OverdratfService {
    overdraftAmount;

    updateOverdraftAmount(amount) {
        this.overdraftAmount = amount;
    }
}