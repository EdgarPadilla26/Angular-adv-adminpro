import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

//Modelo
import { Usuario } from 'src/app/models/usuario.model';

//Servicios
import { UploadService } from 'src/app/services/upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  
  
  public usuario: Usuario;
  public perfilForm: FormGroup;
  public imagen: File;
  public imgTemp: any;

  constructor(private usuarioService: UsuarioService, private uploadService: UploadService, private fb: FormBuilder) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });

  }

  actualizarPerfil(){
    
    //console.log(this.perfilForm.value);
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
      .subscribe(resp=>{
        const {nombre, email} = this.perfilForm.value;//Extrae los valores del formulario
        //Asigna los valores del formulario al objeto
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Animo Pariente', 'Cambios exitosos', 'success');
      },err=>{
        Swal.fire('Uuupps algo salio mal', err.error.msg, 'error');
      });
  }

  actualizarImagen(file: File){
    
    this.imagen = file;
    if(!file) return this.imgTemp = null;

    const reader = new FileReader();
    reader.readAsDataURL(file);//Leer el string de la imagen
    reader.onloadend = ()=>{
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.uploadService.actualizarImagen(this.imagen,this.usuario.Uid,'usuarios')
    .then(img => {
        if(!img){
          return Swal.fire('Uuupps algo salio mal','Inserta una imagen con extension valida (.png, .jpg, .jpeg, .gif)','error');
        }
        this.usuario.img = img//Actualiza la imagen por el archivo seleccionado
        Swal.fire('Animo Pariente', 'Cambios exitosos', 'success'); 
    }).catch(()=>{
        Swal.fire('Uuupps algo salio mal','Inserta una imagen con extension valida (.png, .jpg, .jpeg, .gif)','error');
    });
  }
}
