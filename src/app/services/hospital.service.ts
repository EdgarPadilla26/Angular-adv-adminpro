import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.models';


const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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


  mostrarHospital(){
    return this.http.get(`${url}/hospital`,this.headers)
      .pipe(
        map((resp: {ok: boolean, hospitales: Hospital[]})=>resp.hospitales)
      );
  }

  crearHospital( nombre: string ){
    return this.http.post(`${url}/hospital`,{nombre},this.headers);
  }

  updateHospital( nombre: string, id: string ){
    return this.http.put(`${url}/hospital/${id}`,{nombre},this.headers);
  }

  eliminarHospital( id: string ){
    return this.http.delete(`${url}/hospital/${id}`,this.headers);
  }

  
}
