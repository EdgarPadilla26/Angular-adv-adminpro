import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

//Modelos
import { Usuario } from 'src/app/models/usuario.model';

//Servicios
import { ModalService } from 'src/app/services/modal.service';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  public imagen: File;
  public imgTemp: any;


  constructor(public modalService: ModalService,
              public uploadService: UploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalService.cerrarModal();
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

    const id = this.modalService.id;
    const tabla = this.modalService.tabla;

    this.uploadService.actualizarImagen(this.imagen, id, tabla)
    .then(img => {
        if(!img){
          return Swal.fire('Uuupps algo salio mal','Inserta una imagen con extension valida (.png, .jpg, .jpeg, .gif)','error');
        }
        this.modalService.ImagenActualizada.emit(img);
        Swal.fire('Animo Pariente', 'Cambios exitosos', 'success'); 
        this.cerrarModal();
    }).catch(()=>{
        Swal.fire('Uuupps algo salio mal','Inserta una imagen con extension valida (.png, .jpg, .jpeg, .gif)','error');
    });
  }

}
