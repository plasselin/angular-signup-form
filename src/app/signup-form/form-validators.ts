/**
 * @description Version 1.0.0
 * @link https://github.com/plasselin/your-repo
 * @author Pierre Luc Asselin, on behalf of DevXpress.ca
 */

import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
/**
 * @Description Custom validator for password strength.
 * @see src/app/signup-form/password-strength.directive.ts
 */
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const error = '';
    const hasUpperCase = /[A-Z+]/.test(value);
    const hasSpecialChar = /[@!#$%^&*(),.?":{}|<>]/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]/.test(value);

    const passwordValid = hasUpperCase && hasSpecialChar && hasNumeric && hasLowerCase;

    return !passwordValid ? { passwordStrength: true } : null;
  };
}

/**
 * @Description Function to check if the password confirmation matches the password. Uses abstract control for params.
 * @param control
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const formGroup = control as FormGroup;
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { PasswordNoMatch: true };
};
