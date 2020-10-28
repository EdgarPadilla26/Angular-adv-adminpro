import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styles: [
  ]
})
export class PromiseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    /*const promesa = new Promise((resolve, rejected)=>{

      if(true){
        resolve("todo verde");
      }
      else{
        rejected("todo azul");
      }

    });

    promesa.then((resolve)=>{
      console.log(resolve);
    }).catch((error)=>{
      console.log("tremendo marik" + error);
    })

    console.log("holamnundo");*/
    this.getUsuarios().then(usuario=>{
      console.log(usuario);
    });
  }

  getUsuarios(){

    const promise = new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then(resp=>resp.json())
      .then(resolve=> console.log(resolve.data));
    });

    return promise;
    
  }

}
