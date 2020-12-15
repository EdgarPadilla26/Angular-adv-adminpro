import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';

const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http: HttpClient) { }

  get token(){
    return localStorage.getItem('token') || '';
  }

  get headers(){
        return {
          headers: {
            'utoken': this.token //Header de postman
          }
        }
  }


  mostrarMedico(){
    return this.http.get(`${url}/medico`,this.headers)
    .pipe(
      map((resp: {ok: boolean, medicos: Medico[]})=>{ 
        return resp.medicos;
      })
    );
  }

  mostrarMedicoId(id: string){
    return this.http.get(`${url}/medico/${id}`,this.headers)
    .pipe(
      map((resp: {ok: boolean, medicoDB: Medico})=>{ 
        return resp.medicoDB;
      })
    );
  }
  crearMedico( medico: {nombre: string, hospital: string}){
    return this.http.post(`${url}/medico`,medico,this.headers);
  }

  updateMedico(medico: Medico){
    return this.http.put(`${url}/medico/${medico._id}`, medico ,this.headers);
  }

  eliminarMedico( id: string ){
    return this.http.delete(`${url}/medico/${id}`,this.headers);
  }
}
