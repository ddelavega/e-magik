import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackendComponent } from './backend.component';
import { SetProductosComponent } from './set-productos';

// const routes: Routes = [{ path: '', component: BackendComponent }];
const routes: Routes = [
  // { path: 'dashboard', component: ServiceLogComponent },
  { path: 'administrador', component: BackendComponent },
  { path: 'set-productos', component: SetProductosComponent },
  // { path: 'bitacora-de-servicios', component: ServiceLogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
