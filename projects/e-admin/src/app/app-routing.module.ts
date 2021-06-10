import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login';
import { LandingComponent } from './landing';
import { AuthGuard } from './_helpers';
import { RoleBo } from './_models';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'e-admin',
    loadChildren: () => import('./e-sections/e-sections.module').then(m => m.ESectionsModule),
    canActivate: [AuthGuard],
    data: { roles: [RoleBo.Admin] }
  },
  { path: '', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'backend', loadChildren: () => import('./backend/backend.module').then(m => m.BackendModule) },
  // {
  //   path: 'products',
  //   loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: [RoleBo.Admin] }
  // },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
