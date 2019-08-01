import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AtomsModule} from '../lib/atoms/atoms.module';
import {MoleculesModule} from '../lib/molecules/molecules.module';
import {UsageComponent} from './usage.component';


@NgModule({
    declarations: [
        UsageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AtomsModule,
        MoleculesModule
    ],
    providers: [
    ],
    exports: [
        UsageComponent
    ]
})
export class UsageModule { }
