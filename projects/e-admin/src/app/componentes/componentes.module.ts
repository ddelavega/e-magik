import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { ItemCartComponent } from './item-cart/item-cart.component';


const Components = [ProductoComponent, ItemCartComponent]
@NgModule({
  declarations: [...Components],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [...Components]

})
export class ComponentesModule { }
