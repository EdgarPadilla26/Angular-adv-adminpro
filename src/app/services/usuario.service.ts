import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { map, tap, catchError } from 'rxjs/operators'
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/registerForm';
import { Usuario } from '../models/usuario.model';


declare const gapi: any;
const url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  logout(){
    localStorage.removeItem('token');

    this.auth2.signOut().then(() =>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
    });
    
  }

  async googleInit(){
    return new Promise(resolve=>{
      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '1010257021365-r4d3jr9h3sjktr5659sl4ks8hoa3o7s7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
      
    });
  }

  get token(){
    return localStorage.getItem('token') || '';
  }
  get uid(){
    return this.usuario.Uid || '';
  }
  //Da acceso a usuario que este autenticado 
  validarToken(): Observable<boolean>{
    

    //Peticion get para renovar token
    return this.http.get(`${url}/auth/refresh`,{
      headers: {
        'utoken': this.token //Header de postman
      }
    }).pipe(
      map((resp:any)=>{

        const {Uid, email, google,img = '', nombre,rol } = resp.usuario;
        this.usuario = new Usuario(nombre, email, "", rol, google, img, Uid);

        localStorage.setItem('token', resp.token);//Retorna token para ser actualizado
        return true;

      }), 
      catchError( error => of(false)), //Se borra el token del localstorage o no se encuentra, retorna falso 
    );
  }

  crearUsuario(usuario: RegisterForm){
    return this.http.post(`${url}/usuario`, usuario)
                    .pipe(
                      tap( (resp:any)=>{
                        localStorage.setItem('token', resp.token);
                      })
                    );  
  }

  actualizarUsuario(data: {email: string, nombre: string, rol: string}){

    data = {
      ...data,
      rol: this.usuario.rol,
    }

    return this.http.put(`${url}/usuario/${this.uid}`, data,{
      headers: {
        'utoken': this.token //Header de postman
      }
    });
  }

  loginUsuario(usuario: LoginForm){
    return this.http.post(`${url}/auth`, usuario)
                    .pipe(
                      tap( (resp:any)=>{
                        localStorage.setItem('token', resp.token);
                      })
                    );  
  }
  loginGoogle(token){
    return this.http.post(`${url}/auth/google`, {token})
                    .pipe(
                      tap( (resp:any)=>{
                        localStorage.setItem('token', resp.token);
                      })
                    );  
  }

}
