import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalService } from 'src/app/services/modal.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public medicos: Medico[]=[];
  public buscarH: Hospital;
  public medicoSeleccionado: Medico;
  public medicoGroup: FormGroup;

  constructor(private hospitalService: HospitalService, 
              private fb: FormBuilder,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(resp=>{
      this.mostrarMedicoId(resp.id);
    });
    
    this.medicoGroup = this.fb.group(
      {
        nombre: ['', Validators.required],
        nombrehospital: ['', Validators.required],
      }
    );

    this.mostrarHospital();

    this.medicoGroup.get('nombrehospital').valueChanges.subscribe(ID=>{
      this.buscarH = this.hospitales.find(h => h._id===ID);
    });

  }

  mostrarHospital(){
    this.hospitalService.mostrarHospital()
      .subscribe((hospitales: Hospital[])=>{
        this.hospitales = hospitales;
      });
  }

  mostrarMedicoId(id: string){

    if(id==='nuevo') return;

    this.medicoService.mostrarMedicoId(id).pipe( delay(100) ).subscribe((medico: Medico)=>{

      if(!medico) return this.router.navigateByUrl(`/dashboard/medicos`);
      const {nombre, hospital: {_id}} = medico;
      this.medicoSeleccionado = medico;
      this.medicoGroup.setValue({nombre, nombrehospital: _id});

    },err=>{
      this.router.navigateByUrl(`/dashboard/medicos`);
    });
  }

  guardarMedico(){
    const {nombre} = this.medicoGroup.value;

    if(this.medicoSeleccionado){

      const data = {
        ...this.medicoGroup.value,
        _id: this.medicoSeleccionado._id,
      }
      this.medicoService.updateMedico(data).subscribe(()=>{
        Swal.fire('Fierro pariente', `Medico actualizado exitosamente`, 'success');
      });

    }else{
      this.medicoService.crearMedico(this.medicoGroup.value)
        .subscribe((resp: any)=>{
          Swal.fire('Fierro pariente', `Medico ${nombre} guardado exitosamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medicos/${resp.medico._id}`);
          this.mostrarMedicoId(resp.medico._id);
        },err=>{
          Swal.fire('Uuuuppps ocurrio un error', err.error.msg , 'error');
        });
    }

  }

  

}
