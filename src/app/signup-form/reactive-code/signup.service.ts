import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SignupForm } from '../../models/signup.model';
import { initialFormData } from './signup.reducer';

/**
 * @description Service responsible for handling signup form data operations, including retrieving and saving data to local storage.
 */
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  /**
   * @description Retrieves the signup form data from local storage.
   * @returns An Observable of the SignupForm data.
   */
  getFormData(): Observable<SignupForm> {
    const formData = localStorage.getItem('formData');
    if (formData) {
      return of(JSON.parse(formData) as SignupForm);
    } else {
      return of(initialFormData);
    }
  }

  /**
   * @description Saves the signup form data to local storage.
   * @param formData - The SignupForm data to be saved.
   * @returns An Observable of the saved SignupForm data.
   */
  saveFormData(formData: SignupForm): Observable<SignupForm> {
    localStorage.setItem('formData', JSON.stringify(formData));
    return of(formData);
  }
}
