import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DataTableComponent } from './data-table/data-table.component';
import { CellRendererComponent } from './cell-renderer/cell-renderer.component';


@NgModule({
  declarations: [
    DataTableComponent,
    CellRendererComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
