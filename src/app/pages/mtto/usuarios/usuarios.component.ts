import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

//Modelo
import { Usuario } from 'src/app/models/usuario.model';

//Servicios
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalU: number = 0;
  public desde: number = 0;
  public usuarios: Usuario[]=[];
  public usuariosTemp: Usuario[]=[];
  public SubsImg: Subscription;
  public cargando: boolean = true; //Loader

  constructor(private usuarioService: UsuarioService, 
              private busquedaService: BusquedaService, 
              private router: Router,
              private modalService: ModalService) { }

  

  ngOnInit(): void {

    this.mostrarUsuarios(); 
    
    this.SubsImg = this.modalService.ImagenActualizada.pipe(
      delay(100)
    ).subscribe(()=>{
      this.mostrarUsuarios()
    });

  }
  ngOnDestroy(): void {
    this.SubsImg.unsubscribe();
  }

  mostrarUsuarios(){

    this.cargando = true;
    this.usuarioService.mostrarUsuario(this.desde)
        .subscribe(({total,usuarios})=>{
          this.totalU = total-1;  
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        });
  }

  paginas(valor: number){

    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    }

    if(this.desde >= this.totalU){
      this.desde = this.totalU;
    }
    this.mostrarUsuarios(); 
  }

  buscarUsuario(search: string){

    if(search.length===0){
      this.usuarios = this.usuariosTemp;
      return;
    }
    this.busquedaService.buscar('usuarios',search)
        .subscribe( (resp: Usuario[] )=> {
          this.usuarios = resp;
        });
  }

  mismoUsuario(usuario: Usuario){
    if(usuario.Uid===this.usuarioService.uid){
      return true;
    }
  }

  eliminarUsuario(usuario: Usuario){

    
    if(this.mismoUsuario(usuario)){
      return Swal.fire('Error', 'Te estas elimiando a ti mismo', 'error');
    }
    Swal.fire({
      title: 'Estas seguro?',
      text: `Se eliminara a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp =>{
            Swal.fire("Exito", "Usuario borrado exitosamente","success");
            this.mostrarUsuarios();
          });
      }
    })
  }

  cambiarRol(usuario: Usuario){
    this.usuarioService.cambiarRol(usuario).subscribe(resp=>console.log(resp));
  }

  abrirModal(usuario: Usuario){
    this.modalService.abrirModal('usuarios',usuario.Uid,usuario.img);
  }

}
