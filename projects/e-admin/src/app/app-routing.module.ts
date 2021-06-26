import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LandingComponent } from './landing';
import { AuthGuard } from './shared/guard';
// import { AuthGuard } from './_helpers';
import { RoleBo } from './_models';

const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'registrarse', component: SignUpComponent },
  { path: 'recupero', component: ForgotPasswordComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'e-admin',
    loadChildren: () => import('./e-sections/e-sections.module').then(m => m.ESectionsModule),
    canActivate: [AuthGuard],
    // data: { roles: [RoleBo.Admin] }
  },
  {
    path: '', component: LandingComponent
    // , canActivate: [AuthGuard]
  },
  {
    path: 'backend', loadChildren: () => import('./backend/backend.module').then(m => m.BackendModule),
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
