import {Injectable} from '@angular/core';

@Injectable()
export class OverdratfService {
    overdraftAmount;

    updateOverdraftAmount() {
        this.overdraftAmount = 444;
    }
}