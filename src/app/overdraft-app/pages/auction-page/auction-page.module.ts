import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuctionPageComponent} from './auction-page.component';
import {auctionRoutes} from './auction-page.routing';



@NgModule({
    declarations: [
        AuctionPageComponent
    ],
    imports: [
        RouterModule,
        RouterModule.forChild(auctionRoutes)
    ],
    exports: [
        AuctionPageComponent
    ],
})
export class AuctionPageModule {
}
