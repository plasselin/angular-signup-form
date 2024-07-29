import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import * as SignupActions from './signup.actions';
import { SignupForm } from '../../models/signup.model';
import { SignupService } from './signup.service';
import { of } from 'rxjs';
import { initialFormData } from './signup.reducer';
import { flushLocalData } from './signup.actions';
import { Router } from '@angular/router';

/**
 * @description Effects for handling side effects related to the signup feature.
 */
@Injectable()
export class SignupEffects {
  constructor(
    private actions$: Actions,
    private signupService: SignupService,
    private router: Router
  ) {}

  /**
   * @description Effect to load form data from local storage.
   * @returns An Observable of the corresponding action to load or indicate missing form data.
   */
  loadFormData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignupActions.localStorageIsRequested),
      mergeMap(() => {
        const formData = localStorage.getItem('formData');
        if (formData !== null) {
          const parsedData: SignupForm = JSON.parse(formData);
          const compareData = JSON.stringify(initialFormData);
          if (JSON.stringify(parsedData) === compareData || formData === '{}') {
            return of(SignupActions.localStorageIsMissing());
          } else {
            return of(SignupActions.localStorageIsLoaded({ formData: parsedData }));
          }
        } else {
          return of(SignupActions.localStorageIsMissing());
        }
      })
    )
  );

  /**
   * @description Effect to save form data to local storage.
   * This effect does not dispatch any new actions.
   */
  saveFormData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SignupActions.localStorageIsSaved),
        tap(({ formData }) => {
          localStorage.setItem('formData', JSON.stringify(formData));
        })
      ),
    { dispatch: false }
  );

  /**
   * @description Effect to flush local data and navigate to the home page.
   * This effect does not dispatch any new actions.
   */
  flushLocalData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(flushLocalData),
        tap(() => {
          localStorage.removeItem('formData');
          this.router.navigateByUrl('/');
          console.log('Form Reset');
        })
      ),
    { dispatch: false }
  );
}
