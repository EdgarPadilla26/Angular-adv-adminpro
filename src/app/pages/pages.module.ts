import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

//Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentModule } from '../components/component.module';
import { PipesModule } from '../pipes/pipes.module';

//Paginas
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ChildComponent } from './child.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

//Mantenimiento
import { UsuariosComponent } from './mtto/usuarios/usuarios.component';
import { MedicosComponent } from './mtto/medicos/medicos.component';
import { HospitalesComponent } from './mtto/hospitales/hospitales.component';
import { MedicoComponent } from './mtto/medicos/medico.component';



@NgModule({
  declarations: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    ChildComponent,
    AccountSettingsComponent,
    PromiseComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent,
    MedicoComponent,
  ],
  exports: [
    //Pages
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    ChildComponent,
    AccountSettingsComponent,
    PromiseComponent,
    RxjsComponent,
    ProfileComponent,
    //Mtto
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent,
    MedicoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentModule,
    PipesModule,
  ]
})
export class PagesModule { }
