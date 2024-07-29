/**
 * @description Version 1.0.0
 * @link https://github.com/plasselin/your-repo
 * @author Pierre Luc Asselin, on behalf of DevXpress.ca
 */

import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { passwordStrengthValidator } from '../signup-form/form-validators'; // Update path as necessary

/**
 * @description This directive validates the strength of a password.
 * It uses the custom `passwordStrengthValidator` to perform the validation.
 */
@Directive({
  selector: '[passwordStrength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true
    }
  ]
})
export class PasswordStrengthDirective implements Validator {
  /**
   * @description Validates the control's value using the `passwordStrengthValidator`.
   * @param {AbstractControl} control - The form control to validate.
   * @returns {ValidationErrors | null} - The validation errors or null if the control is valid.
   */
  validate(control: AbstractControl): ValidationErrors | null {
    return passwordStrengthValidator()(control);
  }
}
