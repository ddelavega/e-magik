import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackendComponent } from './backend.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { SetProductosComponent } from './set-productos';

const routes: Routes = [
  { path: 'administrador', component: BackendComponent },
  { path: 'set-productos', component: SetProductosComponent },
  { path: 'historial-pedidos', component: OrderHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
