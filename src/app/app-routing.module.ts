import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChildComponent } from './pages/child.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProgressComponent } from './pages/progress/progress.component';

const routes: Routes = [ 

  {
    path: '', 
    component: ChildComponent,
    children:[
      {path: 'dashboard', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent},
      {path: 'grafica1', component: Grafica1Component},
      {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
    ]
  },
  
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NotfoundComponent}
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
