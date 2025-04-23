import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [
        {
          provide: NG_VALIDATORS,
          useExisting: EmailValidatorDirective,
          multi: true
        }
      ]
})
export class EmailValidatorDirective implements Validator {
    private emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value == null || value === '') {
      return null;
    }
    const valid = this.emailRegexp.test(value);
    return valid ? null : { 'emailValidator': { valid: false, value } };
  }
}

