import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../landing';
import { EAdministrationComponent } from './e-administration.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [

  { path: 'administrador', component: EAdministrationComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'cart', component: CartComponent },
  { path: '', component: ProductosComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ESectionsRoutingModule { }
