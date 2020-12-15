import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.models';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  public SubsImg: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalService: ModalService,
              private busquedaService: BusquedaService,
  ) { }

  ngOnInit(): void {
    this.mostrarHospital();
    this.SubsImg = this.modalService.ImagenActualizada.pipe(
      delay(100)
    ).subscribe(()=>{
      this.mostrarHospital()
    });

  }
  ngOnDestroy(): void {
    this.SubsImg.unsubscribe();
  }

  mostrarHospital(){
    this.cargando = true;
    this.hospitalService.mostrarHospital()
      .subscribe(hospitales=>{
        this.cargando = false;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
      });
  }

  actualizarHospital(hospital: Hospital){
      this.hospitalService.updateHospital(hospital.nombre, hospital._id)
        .subscribe(()=>{
          Swal.fire('Fierro Pariente', 'Se actualizo el nombre del hospital', 'success');
        },err=>{
          Swal.fire('Uuupppss....', err.error.msg, 'error');
        });
    
  }

  eliminarHospital(hospital: Hospital){
      this.hospitalService.eliminarHospital(hospital._id).subscribe(()=>{
        Swal.fire('Fierro Pariente', 'Elimino el hospital', 'success');
        this.mostrarHospital();
      });
  }

  async nombreHospitalSweet(){
    const { value: text } = await Swal.fire({
      input: 'text',
      inputLabel: 'Nombre del Hospital',
      inputPlaceholder: 'Hospital Regional del norte',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    });
    if (text) {
      this.hospitalService.crearHospital(text).subscribe(resp=>{
        Swal.fire('Fierro Pariente', `Se creo el hospital ${text}`, 'success');
        this.mostrarHospital();
      },err=>{
        Swal.fire('Uuupppss....', err.error.msg, 'error');
      })
    }
  }

  buscarHospital(search: string){

    if(search.length===0){
      this.hospitales = this.hospitalesTemp;
      return;
    }
    this.busquedaService.buscar('hospitales',search)
        .subscribe( (resp: Hospital[]) => {
          this.hospitales = resp;
        });
  }

  abrirModal(hospital: Hospital){
    this.modalService.abrirModal('hospitales',hospital._id,hospital.img);
  }

}
