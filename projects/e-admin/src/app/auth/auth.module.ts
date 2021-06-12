import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialDesignModule } from '../material-design';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from '../landing/landing.component';

const COMPONENTS = [
  // LoginComponent
  SignInComponent,
  SignUpComponent,
  ForgotPasswordComponent,
  VerifyEmailComponent,
  ProfileComponent,
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialDesignModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS,
    MaterialDesignModule
  ]
})
export class AuthModule { }
