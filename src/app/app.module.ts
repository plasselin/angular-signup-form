import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { PassWidgetComponent } from './pass-widget/pass-widget.component';
import { MatProgressBarModule} from "@angular/material/progress-bar";
import { PasswordStrengthDirective } from "./directives/password-strength.diretive";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {signupReducer} from "./signup-form/reactive-code/signup.reducer";
import {SignupEffects} from "./signup-form/reactive-code/signup.effects";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    PassWidgetComponent,
    PasswordStrengthDirective
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatSelectModule,
        MatCardModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot({signup: signupReducer}),
        EffectsModule.forRoot([SignupEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
        }),
        MatProgressSpinner,
    ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }  /* Resizes the mat-error field to fit the error message */
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
