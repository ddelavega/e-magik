import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './product-add';
import { ProductEditComponent } from './product-edit';
import { ProductListComponent } from './product-list';
import { AngularCropperjsModule } from 'angular-cropperjs';

const routes: Routes = [

  { path: 'list', component: ProductListComponent },
  { path: 'add', component: ProductAddComponent },
  { path: 'edit', component: ProductEditComponent },
  { path: 'edit/:id', component: ProductEditComponent },
  { path: '', redirectTo: 'list' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
