import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendComponent } from './backend.component';
import { BackendRoutingModule } from './backend-routing.module';
import { SetProductosComponent } from './set-productos/set-productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ComponentesModule } from '../componentes/componentes.module';


@NgModule({
  declarations: [
    BackendComponent,
    SetProductosComponent,
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    BackendRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule
  ]
})
export class BackendModule { }
