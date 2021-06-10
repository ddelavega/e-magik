import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendComponent } from './backend.component';
import { BackendRoutingModule } from './backend-routing.module';
import { SetProductosComponent } from './set-productos/set-productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BackendComponent,
    SetProductosComponent
  ],
  imports: [
    CommonModule,
    BackendRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BackendModule { }
