import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css']
})
export class ProgressComponent  {

  barra1:number = 30;
  barra2:number = 20;

  get Barra1(){
      return `${this.barra1}%`;
  }
  get Barra2(){
    return `${this.barra2}%`;
  }
}
