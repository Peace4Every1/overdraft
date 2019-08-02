import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NotFoundPageComponent} from './not-found-page.component';
import {notFoundRoutes} from './not-found-routing';
import {AtomsModule} from '../../../lib/atoms/atoms.module';
import {MoleculesModule} from '../../../lib/molecules/molecules.module';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(notFoundRoutes),
    AtomsModule,
    MoleculesModule
  ],
  exports: [
    NotFoundPageComponent
  ],
})
export class NotFoundPageModule {
}
