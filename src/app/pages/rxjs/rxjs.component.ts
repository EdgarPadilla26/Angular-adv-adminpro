import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import {filter, map, retry, take} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public Subsc: Subscription;

  constructor() {

      /*let i:number = 0; 
      this.Observable(i)
          .pipe( retry(2))
          .subscribe(valor=>console.log("subs ", valor), error=>console.warn(error), ()=>console.info("acabe"));*/

      this.Subsc = this.Intervalo().subscribe(valor=>console.log(valor), e=> console.warn("Problema"), ()=>console.log("acabe"));
   }

  ngOnDestroy(): void {
    this.Subsc.unsubscribe();
  }

   Intervalo(): Observable<number>{
     return interval(300)
            .pipe( map(valor => valor + 1), filter(valor=>(valor%2==0?true:false)));

   }

   Observable(i: number): Observable<number>{
      
    return new Observable(observable=>{        
        const inter = setInterval(() => {
          i++;
          observable.next(i);

          if(i===4){
            clearInterval(inter);
            observable.complete();
          }

          if(i===2){
            observable.error("tonto");
          }
        }, 1000);

        
      });
      
   }

  

}
