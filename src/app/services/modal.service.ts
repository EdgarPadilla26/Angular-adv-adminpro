import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';

const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultarModal: boolean = true;

  public tabla: 'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;

  public ImagenActualizada: EventEmitter<string> = new EventEmitter<string>(); 

  constructor(private activatedRoute: ActivatedRoute) { }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tabla: 'usuarios'|'medicos'|'hospitales', id: string, img?: string){

    this._ocultarModal = false;
    this.tabla = tabla;
    this.id = id;
    if(!img){
      this.img = `${url}/subirarchivo/${tabla}/noimagen`;
    }else if(img.includes('https')){
      this.img = img;
    }else{
      this.img = `${url}/subirarchivo/${tabla}/${img}`;
    }
     
  }

  cerrarModal(){
    this._ocultarModal=true;
  }
}
