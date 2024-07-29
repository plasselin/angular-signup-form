/**
 * @description Version 1.0.0 MIT License
 * @link https://github.com/plasselin/your-repo
 * @author Pierre Luc Asselin, on behalf of DevXpress.ca
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs';
import { SignupState } from './reactive-code/signup.reducer';
import * as SignupActions from './reactive-code/signup.actions';
import { SignupService } from './reactive-code/signup.service';
import { SignupForm } from '../models/signup.model';
import { confirmPasswordValidator, passwordStrengthValidator } from './form-validators';
import { flushLocalData } from "./reactive-code/signup.actions";

/**
 * @description Component for the signup form with stepper functionality.
 * @selector app-signup-form
 */
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  hidePassword = true;
  hideConfirmPassword = true;
  signupForm!: FormGroup;
  signupFormPart2!: FormGroup;
  password: string = '';
  isLoading = false;

  /**
   * @description Constructor for SignupFormComponent.
   * @param store - The NgRx store instance for state management.
   * @param signupService - The service handling signup-related operations.
   */
  constructor(
    private store: Store<{ signup: SignupState }>,
    private signupService: SignupService,
  ) {}

  /**
   * @description Angular lifecycle hook that runs once the component has been initialized.
   */
  ngOnInit() {
    this.store.dispatch(SignupActions.localStorageIsRequested());

    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordStrengthValidator()]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: confirmPasswordValidator });

    this.signupFormPart2 = new FormGroup({
      country: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      subscribe: new FormControl(false)
    });

    this.signupForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      if (this.signupForm.valid) {
        this.saveFormPartial(this.signupForm);
      }
    });

    this.signupFormPart2.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      if (this.signupFormPart2.valid) {
        this.saveFormPartial(this.signupFormPart2);
      }
    });

    this.signupService.getFormData().subscribe((formData: SignupForm) => {
      this.signupForm.patchValue(formData);
      this.signupFormPart2.patchValue(formData);
      this.store.dispatch(SignupActions.localStorageIsPresent({ formData }));
    });
  }

  /**
   * @description Saves the complete form data to the local storage. setTimeout is used to simulate an API call and make the spinner visible
   */
  saveForm() {
    const formData = {
      id: new Date().toISOString(),
      ...this.signupForm.value,
      ...this.signupFormPart2.value
    };

    this.store.dispatch(SignupActions.localStorageIsSaved({ formData }));
    setTimeout(() => {
      this.signupService.saveFormData(formData).subscribe(
        () => {
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          console.error(error);
        }
      );
    }, 1000);
  }

  /**
   * @description Saves partial form data to local storage.
   * @param formGroup - The FormGroup containing the partial form data.
   */
  saveFormPartial(formGroup: FormGroup) {
    const partialFormData = formGroup.value;
    const existingData = JSON.parse(localStorage.getItem('formData') || '{}');
    const updatedData = { ...existingData, ...partialFormData };

    this.store.dispatch(SignupActions.localStorageIsSaved({ formData: updatedData }));
    this.signupService.saveFormData(updatedData).subscribe(() => {
      // console.log('Partial form data saved');
    }, error => {
      console.error(error);
    });
  }

  /**
   * @description Handles form submission.
   */
  onSubmit(): void {
    this.isLoading = true;
    this.saveForm()
  }

  /**
   * @description Handles the keyup event for the password field.
   * @param event - The KeyboardEvent triggered by the keyup event.
   */
  onPasswordKeyUp(event: KeyboardEvent) {
    this.password = (event.target as HTMLInputElement).value;
    console.log('Password: Key Up Fired');
  }

  /**
   * @description Resets the form control values and local storage data.
   */
  resetControlValues(): void {
    if (this.stepper.selectedIndex === 1) {
      this.stepper.previous();
    }
    this.store.dispatch(flushLocalData());
    this.signupForm.reset();
    this.signupFormPart2.reset();
  }
}
