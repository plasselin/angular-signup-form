import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupFormComponent} from "./signup-form/signup-form.component";

const routes: Routes = [
  {
    path: '',
    component: SignupFormComponent,
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
