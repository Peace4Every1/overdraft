import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuctionPageComponent} from './auction-page.component';
import {auctionRoutes} from './auction-page.routing';
import {CommonModule} from '@angular/common';
import {AtomsModule} from '../../../lib/atoms/atoms.module';
import {MoleculesModule} from '../../../lib/molecules/molecules.module';



@NgModule({
    declarations: [
        AuctionPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(auctionRoutes),
        AtomsModule,
        MoleculesModule
    ],
    exports: [
        AuctionPageComponent
    ],
})
export class AuctionPageModule {
}
