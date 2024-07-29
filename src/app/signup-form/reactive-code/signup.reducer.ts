import { createReducer, on } from '@ngrx/store';
import * as SignupActions from './signup.actions';
import { SignupForm } from '../../models/signup.model';

/**
 * @description Interface representing the state of the signup form.
 */
export interface SignupState {
  formData: SignupForm;
  currentAction: string;
}

/**
 * @description Initial form data for the signup form.
 */
export const initialFormData: SignupForm = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  country: '',
  province: '',
  address: '',
  birthDate: '',
  subscribe: false
};

/**
 * @description Initial state for the signup feature.
 */
export const initialState: SignupState = {
  formData: initialFormData,
  currentAction: ''
};

/**
 * @description Reducer function for handling signup-related actions.
 * @param state - The current state of the signup feature.
 * @param action - The action dispatched to modify the state.
 * @returns The new state of the signup feature.
 */
export const signupReducer = createReducer(
  initialState,
  on(SignupActions.localStorageIsPresent, (state, { formData }) => ({
    ...state,
    formData,
    currentAction: '[Local Storage Present] FormData Loaded'
  })),
  on(SignupActions.localStorageIsSaved, (state, { formData }) => ({
    ...state,
    formData,
    currentAction: '[Local Storage Saved] FormData Saved'
  })),
  on(SignupActions.localStorageIsMissing, state => ({
    ...state,
    formData: initialFormData,
    currentAction: '[Local Storage Missing] FormData Missing'
  })),
  on(SignupActions.flushLocalData, state => ({
    ...state,
    formData: initialFormData,
    currentAction: '[Local Storage Flushed] FormData Flushed'
  }))
);
