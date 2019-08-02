import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsageComponent } from './usage/usage.component';

import { FormValidatorService } from './lib/services/form-validator.service';

import {LoginPageComponent} from './overdraft-app/pages/login-page/login-page.component';
import {AuthenticationService} from './overdraft-app/services/authentication.service';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routing';
import {AtomsModule} from './lib/atoms/atoms.module';
import {MoleculesModule} from './lib/molecules/molecules.module';
import {CoreModule} from './overdraft-app/core-components/core.module';
import {AlertBoxService} from './lib/atoms/alert-box/alert-box.service';

@NgModule({
  declarations: [
    AppComponent,
    UsageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    CoreModule,
    AtomsModule,
    MoleculesModule
  ],
  providers: [
    FormValidatorService,
    AuthenticationService,
    AlertBoxService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
