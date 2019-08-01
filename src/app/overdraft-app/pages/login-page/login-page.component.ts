import {Component} from '@angular/core';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html'
})

export class LoginPageComponent {
    fieldConfig = [
        {
            type: 'text',
            model: 'username',
            placeholder : 'username',
            validationRules: [
                {
                    rule: 'required'
                },
                {
                    rule: 'minLength',
                    value: 4,
                    errMsg: 'Username must be at least 4 symbols'
                }
            ]
        },
        {
            type: 'text',
            model: 'password',
            placeholder : 'password',
            validationRules: [
                {
                    rule: 'required'
                },
                {
                    rule: 'minLength',
                    value: 2,
                    errMsg: 'Password must be at least 4 symbols'
                }
            ]
        }
    ];

    sendBtnText = 'Send data';

}