import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';



@NgModule({
  declarations: [
    ProductoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ProductoComponent]

})
export class ComponentesModule { }
