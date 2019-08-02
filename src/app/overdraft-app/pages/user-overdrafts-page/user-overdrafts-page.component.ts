import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OverdratfService} from '../../dal/overdraft/overdratf.service';

@Component({
    selector: 'app-user-overdrafts-page',
    templateUrl: './user-overdrafts-page.component.html',
    styleUrls: []
})
export class UserOverdraftsPageComponent implements OnInit {
    ovardraftPerUser;

    constructor(private overdratfService: OverdratfService) {}

    ngOnInit() {
        this.ovardraftPerUser = this.overdratfService.ovardraftPerUser;
    }
}