import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { AuthRoutingModule } from './auth/auth.routing';

import { NotfoundComponent } from './notfound/notfound.component';
import { ChildRoutesModule } from './pages/child.routing';

const routes: Routes = [ 

  {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}
  
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    ChildRoutesModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
