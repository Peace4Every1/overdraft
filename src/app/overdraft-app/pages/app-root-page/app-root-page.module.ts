import {NgModule} from '@angular/core';
import {AppRootPageComponent} from './app-root-page.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        AppRootPageComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [],
    exports: [
        AppRootPageComponent
    ]
})

export class AppRootPageModule {}