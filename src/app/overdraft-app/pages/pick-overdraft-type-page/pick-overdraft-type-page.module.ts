import {NgModule} from '@angular/core';
import {PickOverdraftTypePageComponent} from './pick-overdraft-type-page.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {pickOverdraftTypeRoutes} from './pick-overdraft-type-page.routing';
import {AtomsModule} from '../../../lib/atoms/atoms.module';
import {MoleculesModule} from '../../../lib/molecules/molecules.module';

@NgModule({
    declarations: [
        PickOverdraftTypePageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(pickOverdraftTypeRoutes),
        AtomsModule,
        MoleculesModule
    ],
    providers: [],
    exports: [
        PickOverdraftTypePageComponent
    ]
})

export class PickOverdraftTypePageModule {

}