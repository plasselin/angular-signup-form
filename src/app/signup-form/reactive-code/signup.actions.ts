import { createAction, props } from '@ngrx/store';
import { SignupForm } from '../../models/signup.model';

/**
 * @description Enum representing the action types for the signup feature.
 */
export enum ActionTypes {
  LocalStorageIsSaved = '[Local Storage Saved] FormData Saved',
  LocalStorageIsPresent = '[Local Storage Present] FormData Present',
  LocalStorageIsLoaded = '[Local Storage Loaded] FormData Loaded',
  LocalStorageIsMissing = '[Local Storage Missing] FormData Missing',
  LocalStorageIsRequested = '[Local Storage Requested] FormData Requested',
}

/**
 * @description Action to request the local storage data.
 */
export const localStorageIsRequested = createAction(ActionTypes.LocalStorageIsRequested);

/**
 * @description Action to indicate that form data is present in local storage.
 * @param {SignupForm} formData - The form data retrieved from local storage.
 */
export const localStorageIsPresent = createAction(
  ActionTypes.LocalStorageIsPresent,
  props<{ formData: SignupForm }>()
);

/**
 * @description Action to indicate that form data has been saved to local storage.
 * @param {SignupForm} formData - The form data to be saved to local storage.
 */
export const localStorageIsSaved = createAction(
  ActionTypes.LocalStorageIsSaved,
  props<{ formData: SignupForm }>()
);

/**
 * @description Action to load form data from local storage.
 * @param {SignupForm} formData - The form data loaded from local storage.
 */
export const localStorageIsLoaded = createAction(
  ActionTypes.LocalStorageIsLoaded,
  props<{ formData: SignupForm }>()
);

/**
 * @description Action to flush the local storage data.
 */
export const flushLocalData = createAction(
  '[Flush Local Data] Local storage flushed.'
);

/**
 * @description Action to indicate that form data is missing from local storage.
 */
export const localStorageIsMissing = createAction(ActionTypes.LocalStorageIsMissing);
