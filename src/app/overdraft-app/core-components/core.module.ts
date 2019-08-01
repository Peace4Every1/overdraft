import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// components
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';

@NgModule ({
    declarations: [
        HeaderComponent,
        MainLayoutComponent
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        HeaderComponent,
        MainLayoutComponent
    ],
    providers: []
})

export class CoreModule { }
