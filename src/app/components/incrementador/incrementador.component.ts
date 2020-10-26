import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  @Input() progreso: number = 50;
  @Input() btnClass: string = "btn btn-primary";

  @Output() enviar: EventEmitter <number> = new EventEmitter();
  

  cambio(num: number){

    if(this.progreso == 0 && num<0){
      this.enviar.emit(0);
      return this.progreso = 0;
    }
    if(this.progreso == 100 && num>0){
      this.enviar.emit(100);
      return this.progreso = 100;
    }


    this.progreso = this.progreso + num;
    this.enviar.emit(this.progreso);
  }


  OnChanges(valor:number) {
      if(valor>100){
        this.progreso=100;
      }else if(valor<0){
        this.progreso=0;
      }else{
        this.progreso=valor;
      }

      this.enviar.emit(this.progreso);
  }
}
