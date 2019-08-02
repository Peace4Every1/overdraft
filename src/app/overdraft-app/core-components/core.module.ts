import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// components
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import {AtomsModule} from '../../lib/atoms/atoms.module';
import {MoleculesModule} from '../../lib/molecules/molecules.module';

@NgModule ({
    declarations: [
        HeaderComponent,
        MainLayoutComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        AtomsModule,
        MoleculesModule
    ],
    exports: [
        HeaderComponent,
        MainLayoutComponent
    ],
    providers: []
})

export class CoreModule { }
