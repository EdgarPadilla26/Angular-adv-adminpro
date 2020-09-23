import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router'

import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ChildComponent } from './child.component';
import { SharedModule } from '../shared/shared.module';
import { ChildRoutesModule } from './child.routing';



@NgModule({
  declarations: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    ChildComponent,
  ],
  exports: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    ChildComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
export class PagesModule { }
