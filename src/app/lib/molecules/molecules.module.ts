import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AtomsModule } from '../atoms/atoms.module';

import { RepetitiveTableComponent } from './repetitive-table/repetitive-table.component';
import { RepetitiveTableRowComponent } from './repetitive-table/repetitive-table-row/repetitive-table-row.component';

import { FormGeneratorComponent} from './form-generator/form-generator.component';


@NgModule({
    declarations: [
        RepetitiveTableComponent,
        RepetitiveTableRowComponent,
        FormGeneratorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AtomsModule
    ],
    providers: [],
    exports: [
        RepetitiveTableComponent,
        RepetitiveTableRowComponent,
        FormGeneratorComponent
    ]
})
export class MoleculesModule { }
