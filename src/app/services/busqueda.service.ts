import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.models';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';


const url = environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class BusquedaService {

  constructor(private http: HttpClient) { }

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

  convertirAUsuarios(data: any[]): Usuario[]{
    return data.map(user=>new Usuario(user.nombre,user.email,'', user.rol,user.google,user.img,user.Uid));
  }

  convertirAHospitales(data: any[]): Hospital[]{
    return data;
  }
  convertirAMedicos(data: any[]): Medico[]{
    return data;
  }


  buscar( tabla: 'usuarios'|'medicos'|'hospitales', search: string){
    
    /* /busqueda/coleccion/tabla/search*/

    return this.http.get<any[]>(`${url}/busqueda/coleccion/${tabla}/${search}`,this.headers)
            .pipe(
              map( (resp:any) => {
                switch (tabla) {
                  case 'usuarios':
                    return this.convertirAUsuarios(resp.data);
                  case 'hospitales':
                      return this.convertirAHospitales(resp.data);
                  case 'medicos':
                      return this.convertirAMedicos(resp.data);
                  default:
                    break;
                }
              })
            );
  }
}
