import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '../material-design';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EAdministrationComponent } from '.';
import { ESectionsRoutingModule } from './e-sections-routing.module';
import { ProductosComponent } from './productos/productos.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { CartComponent } from './cart/cart.component';

const COMPONENTS = [EAdministrationComponent, ProductosComponent, CartComponent];
@NgModule({
  declarations: [...COMPONENTS,],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    ESectionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    ComponentesModule
  ]
})
export class ESectionsModule { }
