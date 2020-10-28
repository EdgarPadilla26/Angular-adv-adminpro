import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router'
import {FormsModule} from '@angular/forms'

//Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentModule } from '../components/component.module';



//Paginas

import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ChildComponent } from './child.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';




@NgModule({
  declarations: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    ChildComponent,
    AccountSettingsComponent,
    PromiseComponent,
    RxjsComponent,
  ],
  exports: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    ChildComponent,
    AccountSettingsComponent,
    PromiseComponent,
    RxjsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentModule,
  ]
})
export class PagesModule { }
