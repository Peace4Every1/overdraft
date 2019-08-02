import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AtomsModule} from '../../../lib/atoms/atoms.module';
import {MoleculesModule} from '../../../lib/molecules/molecules.module';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './user-profile-page.component';
import {userProfileRoutes} from './user-profile-page.routing';


@NgModule({
    declarations: [
        UserProfileComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(userProfileRoutes),
        AtomsModule,
        MoleculesModule
    ],
    exports: [
        UserProfileComponent
    ],
})
export class UserProfileModule {
}
