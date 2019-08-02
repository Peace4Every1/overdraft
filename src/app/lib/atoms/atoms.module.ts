import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputComponent } from './input/input.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonComponent } from './button/button.component';
import { FileUploadComponent} from './file-upload/file-upload.component';
import { FileUploadResultsComponent } from './file-upload-results/file-upload-results.component';
import { SelectAutocompleteComponent } from './select-autocomplete/select-autocomplete.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { LinkWithIconComponent } from './link-with-icon/link-with-icon.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TabsComponent } from './tabs/tabs.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';



@NgModule({
    declarations: [
        ErrorMsgComponent,
        InputComponent,
        DatepickerComponent,
        ButtonComponent,
        FileUploadComponent,
        FileUploadResultsComponent,
        SelectAutocompleteComponent,
        CheckboxComponent,
        RadioButtonComponent,

        NavigationComponent,
        NavigationItemComponent,
        LinkWithIconComponent,
        TabsComponent,
        AlertBoxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    providers: [
    ],
    exports: [
        ErrorMsgComponent,
        InputComponent,
        DatepickerComponent,
        ButtonComponent,
        FileUploadComponent,
        FileUploadResultsComponent,
        SelectAutocompleteComponent,
        CheckboxComponent,
        RadioButtonComponent,

        NavigationComponent,
        NavigationItemComponent,
        LinkWithIconComponent,
        TabsComponent,
        AlertBoxComponent
    ]
})
export class AtomsModule { }
