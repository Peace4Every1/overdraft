import {Injectable} from '@angular/core';

@Injectable()
export class FormValidatorService {
  defaultErrMesages = {
    required: 'Field is required',
    minLength: 'Field doesn\'t match min lenght',
    maxLength: 'Field doesn\'t match max lenght',
    pattern: 'Field doesn\'t match pattern'
  };

  defaultPatterns = {
    number: '^[0-9]{1,}$', // allows only numbers
    email: '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@' +
           '((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$', // create mine
    phone: '[2-9]{1}\\d{2}',
    url: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)',
  };

  fieldValidationRules = {
    required: (value) => {
      return !!value && value.length >= 1;
    },

    pattern: (value, pattern) => {
      // console.log(pattern);

      const regExp = new RegExp(pattern, 'g');
      return value && value.match(regExp);
    },

    minLength: (value, minLength) => {
      return !!value && value.length >= minLength;
    },

    maxLength: (value, maxLength) => {
      return !!value && value.length <= maxLength;
    }
  };

  validate(confRule: ValidationRules, fieldValue) {
    const isValid = this.fieldValidationRules[confRule.rule](fieldValue, confRule.value);
    return isValid;
  }

  validateField(field) {
    field['errMsg'] = [];
    field['hasErr'] = false;

    let validateAgainsValueInProperty;

    if (!field.component || field.component === 'input') {
      validateAgainsValueInProperty = 'value';
    }

    if (field.component === 'file') {
      validateAgainsValueInProperty = 'files';
    }

    if (field.component === 'select' || field.component === 'radio' || field.component === 'checkbox') {
      validateAgainsValueInProperty = 'selectedOptions';
    }


    this.validateInput(field, validateAgainsValueInProperty);

    return field['hasErr'];

  }

  validateInput(field, validateAgainsValueInProperty) {
    let hasOwnPattern; // specefic to input component only

    if (!field.component || field.component === 'input') {
      hasOwnPattern = false; // specefic to input component only
    }

    if (field.validationRules) {
      field.validationRules.filter( validateRule => {
        const isValid = this.validate(validateRule, field[validateAgainsValueInProperty]);
        if (!isValid) {
          field.hasErr = true;

          if ( !validateRule['errMsg'] ) {
            field.errMsg.push(this.defaultErrMesages[validateRule['rule']]);
          } else {
            field.errMsg.push(validateRule.errMsg);
          }
        }

        if (!field.component || field.component === 'input') {
          // if has no custom pattern but has global pattern if the field is touch, then check it
          hasOwnPattern = validateRule.pattern ? true : false;
        }
      });
    }

    if (!field.component || field.component === 'input') {
      // check default pattern : specefic to input type
      const pattern = this.defaultPatterns[field.type];
      if ( !hasOwnPattern && pattern ) {
        const regExp = new RegExp(pattern, 'g');

        if (field['value'] && !field['value'].match(regExp)) {
          const errMsg = this.defaultErrMesages['pattern'];
          field['hasErr'] = true;
          field['errMsg'] = [];
          field['errMsg'].push(errMsg);
        }
      }
    }
  }
}

export interface ValidationRules {
  rule: string; // rule name : required, minLength, maxLength, pattern
  value?: any; // rule related check data
  errMsg?: string;
}
