import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../landing';
import { EAdministrationComponent } from './e-administration.component';
import { ProductosComponent } from './productos/productos.component';
import { ServiceLogComponent } from './service-log/service-log.component';

const routes: Routes = [
  // { path: 'dashboard', component: ServiceLogComponent },
  { path: 'administrador', component: EAdministrationComponent },
  { path: 'bitacora-de-servicios', component: ServiceLogComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'cart', component: CartComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ESectionsRoutingModule { }
