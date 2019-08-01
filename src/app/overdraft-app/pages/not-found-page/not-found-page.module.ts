import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NotFoundPageComponent} from './not-found-page.component';
import {notFoundRoutes} from './not-found-routing';


@NgModule({
  declarations: [
    NotFoundPageComponent
  ],
  imports: [
    RouterModule,
    RouterModule.forChild(notFoundRoutes)
  ],
  exports: [
    NotFoundPageComponent
  ],
})
export class NotFoundPageModule {
}
