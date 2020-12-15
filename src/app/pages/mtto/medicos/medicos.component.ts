import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

//Modelos
import { Medico } from 'src/app/models/medico.model';

//Servicios
import { BusquedaService } from 'src/app/services/busqueda.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public SubsImg: Subscription;

  constructor(private medicoService: MedicoService, 
              private modalService: ModalService,
              private busquedaService: BusquedaService,
  ) { }

  ngOnInit(): void {
    this.mostrarMedico();
    this.SubsImg = this.modalService.ImagenActualizada.pipe(
      delay(100)
    ).subscribe(()=>{
      this.mostrarMedico()
    });

  }
  ngOnDestroy(): void {
    this.SubsImg.unsubscribe();
  }

  mostrarMedico(){
    this.cargando = true;
    this.medicoService.mostrarMedico()
      .subscribe(medicos=>{
        this.cargando = false;
        this.medicos = medicos;
        this.medicosTemp = medicos;
      });
  }

  actualizarMedico(medico: Medico){
    this.medicoService.updateMedico(medico)
      .subscribe(()=>{
        Swal.fire('Fierro Pariente', 'Se actualizo el nombre del medico', 'success');
      },err=>{
        Swal.fire('Uuupppss....', err.error.msg, 'error');
      });
    
  }

  eliminarMedico(medico: Medico){
    Swal.fire({
      title: 'ELiminando?',
      text: `Estas seguro que quieres eliminar a ${medico.nombre}` ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico._id).subscribe(()=>{
          Swal.fire('Fierro Pariente', 'Elimino el medico', 'success');
          this.mostrarMedico();
        });
      }
    });
  }

  buscarMedico(search: string){

    if(search.length===0){
      this.medicos = this.medicosTemp;
      return;
    }
    this.busquedaService.buscar('medicos',search)
        .subscribe( (resp: Medico[]) => {
          this.medicos = resp;
        });
  }


  abrirModal(medico: Medico){
    this.modalService.abrirModal('medicos',medico._id,medico.img);
  }

}
