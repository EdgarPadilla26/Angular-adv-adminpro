import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ChildComponent } from './child.component';

//Paginas
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
    {
        path: 'dashboard', 
        component: ChildComponent,
        canActivate: [ AuthGuard ],
        children:[
          {path: '', component: DashboardComponent, data: {title: 'Inicio'}},
          {path: 'progress', component: ProgressComponent, data: {title: 'ProgressBar'}},
          {path: 'grafica1', component: Grafica1Component, data: {title: 'Grafica1'}},
          {path: 'promesa', component: PromiseComponent, data: {title: 'Promesa'}},
          {path: 'rxjs', component: RxjsComponent, data: {title: 'RxJs'}},
          {path: 'profile', component: ProfileComponent, data: {title: 'Profile'}},
          {path: 'accountSettings', component: AccountSettingsComponent, data: {title: 'Tema de la pagina'}},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildRoutesModule {}
