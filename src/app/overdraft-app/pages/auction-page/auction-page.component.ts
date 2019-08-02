import {Component} from '@angular/core';
import {auctionData} from '../../dal/auction/auction-data.models';

@Component({
    selector: 'app-auction-page',
    templateUrl: './auction-page.component.html'
})

export class AuctionPageComponent {
    auctionData = auctionData;

    objectKeys = Object.keys;
}