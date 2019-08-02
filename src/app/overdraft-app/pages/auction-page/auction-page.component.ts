import {Component, OnInit} from '@angular/core';
import {auctionData} from '../../dal/auction/auction-data.models';
import {AlertBoxService} from '../../../lib/atoms/alert-box/alert-box.service';
import {OverdratfService} from '../../dal/overdraft/overdratf.service';
import {customizeNumberService} from '../../../lib/services/customize-number.service';
import {budget} from '../../dal/banks/bank-data.models';

@Component({
    selector: 'app-auction-page',
    templateUrl: './auction-page.component.html',
    styleUrls: ['./auction-page.component.less']
})

export class AuctionPageComponent implements OnInit {
    auctionData = auctionData;

    objectKeys = Object.keys;

    fieldConfig;
    actualBid;
    mustMinBidAmount;
    loandAmount;

    mathFloor = (number) => { return Math.floor(number) };

    constructor(private alertBoxService: AlertBoxService,
                private overdratfService: OverdratfService) {}

    ngOnInit() {
        this.loandAmount = customizeNumberService(this.overdratfService.overdraftAmount);
        this.calcMinAllowedBidNUmber();

        this.fieldConfig = [
            {
                type: 'number',
                model: 'salary',
                placeholder : 'your bid',
                iconClass: 'icon-user-outline',
                leftIcon: true,
                validationRules: [
                    {
                        rule: 'required'
                    },
                    {
                        rule: 'pattern',
                        value: '^[1-9][0-9]{1,}$',
                        errMsg: 'Please enter positive number'
                    },
                    {
                        rule: 'minLength',
                        value: this.mustMinBidAmount.toString().length,
                        errMsg: `Bid can not be at least ${this.mustMinBidAmount.toString().length} symbols`
                    },

                ]
            }
        ];
    }

    calcMinAllowedBidNUmber() {
        this.auctionData['minAllowedAddition'] = this.auctionData.lastBid * 0.1; // 10 percent
        this.mustMinBidAmount = +this.auctionData.lastBid + +this.auctionData['minAllowedAddition'];
    }


    onBidInput(event) {
       this.actualBid = event;
    }

    onBidSubmission(event) {
        if (this.actualBid < this.mustMinBidAmount) {
            this.alertBoxService.initMsg({type: 'error', text: `Your actual bid can not be smaller ${this.mustMinBidAmount} amd`});
            return;
        } else {
            this.alertBoxService.initMsg({type: 'success', text: `Congrats, Your bid is accepted`});
            auctionData['lastBid'] = this.actualBid;
            delete this.fieldConfig[0]['value'];
            this.calcMinAllowedBidNUmber();
        }
    }
}