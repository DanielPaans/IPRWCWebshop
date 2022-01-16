import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {SharedModule} from "../shared/shared.module";
import { PasswordValidatorDirective } from './signup/password-validator.directive';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    PasswordValidatorDirective
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AuthModule { }
