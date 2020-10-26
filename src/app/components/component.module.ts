import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';


import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonnutComponent } from './donnut/donnut.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonnutComponent
  ],
  exports: [
    IncrementadorComponent,
    DonnutComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ChartsModule,
  ]
})
export class ComponentModule { }
