import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialDesignModule } from '../material-design';
import { LoginComponent } from './login';
import { AuthRoutingModule } from './auth-routing.module';

const COMPONENTS = [
  LoginComponent
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
