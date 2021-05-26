import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '../material-design';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EAdministrationComponent, ServiceLogComponent } from '.';
import { ESectionsRoutingModule } from './e-sections-routing.module';

const COMPONENTS = [EAdministrationComponent, ServiceLogComponent];
@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    ESectionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule
  ]
})
export class ESectionsModule { }
