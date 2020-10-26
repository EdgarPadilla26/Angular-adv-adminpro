import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ChildComponent } from './child.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



const routes: Routes = [
    {
        path: 'dashboard', 
        component: ChildComponent,
        children:[
          {path: '', component: DashboardComponent},
          {path: 'progress', component: ProgressComponent},
          {path: 'grafica1', component: Grafica1Component},
          {path: 'accountSettings', component: AccountSettingsComponent},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildRoutesModule {}
