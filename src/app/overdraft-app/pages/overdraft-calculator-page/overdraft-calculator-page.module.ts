import {NgModule} from '@angular/core';
import {OverdraftCalculatorPageComponent} from './overdraft-calculator-page.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {overdraftCalculatorRoutes} from './overdraft-calculator-page.routing';
import {AtomsModule} from '../../../lib/atoms/atoms.module';
import {MoleculesModule} from '../../../lib/molecules/molecules.module';

@NgModule({
    declarations: [
        OverdraftCalculatorPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(overdraftCalculatorRoutes),
        AtomsModule,
        MoleculesModule
    ],
    providers: [],
    exports: [
        OverdraftCalculatorPageComponent
    ]
})

export class OverdraftCalculatorPageModule {}