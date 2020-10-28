import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  
  public label1: string[] = ['Fierro', 'Pariente', 'Obrador'];
  public sizes: any[] = [
     [200, 350, 200]
  ];
  

}
