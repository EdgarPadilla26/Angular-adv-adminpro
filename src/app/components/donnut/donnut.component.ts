import { Component, Input, } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-donnut',
  templateUrl: './donnut.component.html',
  styles: [
  ]
})
export class DonnutComponent  {

   @Input() title: string = 'Sin titulo';
   // Doughnut
   @Input() label: Label[] = ['a ver', 'si', 'sale'];
   @Input() doughnutChartData: MultiDataSet = [
     [350, 450, 100]
   ];
   public colors:Color[] = [
     {backgroundColor: ['#00FFFF','#A52A2A','#5F9EA0']}
   ];
}
