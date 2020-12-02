import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formEnviado: boolean = false;

  public registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      terminos: [true, Validators.required],
    }, {
      validators: [
        this.validarContra('password', 'passwordConfirm'),
        this.validarTermino('terminos')      
    ]
  }); 

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  crearUsuario(){
    this.formEnviado = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return;
    }

    //Enviar datos de formulario
    this.usuarioService.crearUsuario(this.registerForm.value)
                        .subscribe(resp=>{
                            //Si se encuentra el usuario, redirecciona al dashboard
                            this.router.navigateByUrl('/');
                          }, err=>{
                            Swal.fire('Error', err.error.msg, 'error');
                          }
                        );
  }

  noValido( campo: string ): boolean{
    
    if(this.registerForm.get(campo).invalid && this.formEnviado){
      return true;
    }else{
      return false;
    }

  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formEnviado;
  }

  validarTermino(terminos:string){

    return (formgroup: FormGroup)=>{

      const passControl1=formgroup.get(terminos);
      if(passControl1.value){
        passControl1.setErrors(null);
      }else{
        passControl1.setErrors({camposDiferentes: true});
      }
    }

  }
  ContrasenanoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('passwordConfirm').value;

    if(!(pass1===pass2) && this.formEnviado){
      return true
    }else{
      return false
    }
  }

  validarContra(pass1: string ,pass2: string){

    return (formgroup: FormGroup)=>{

      const passControl1=formgroup.get(pass1);
      const passControl2=formgroup.get(pass2);

      if(passControl1.value===passControl2.value){
        passControl2.setErrors(null);
      }else{
        passControl2.setErrors({camposDiferentes: true});
      }
    }
  }
}
