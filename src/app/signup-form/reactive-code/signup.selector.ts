import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SignupState } from './signup.reducer';

/**
 * @description Selector to access the signup feature state.
 */
export const selectSignupState = createFeatureSelector<SignupState>('signup');

/**
 * @description Selector to access the form data from the signup state.
 * @param state - The current state of the signup feature.
 * @returns The form data from the signup state.
 */
export const selectSignupFormData = createSelector(
  selectSignupState,
  (state: SignupState) => state.formData
);
