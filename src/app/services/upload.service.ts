import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  async actualizarImagen(img: File, id: string, tabla: 'usuarios'|'medicos'|'hospitales'){

    try {
      
      const path = `${url}/subirarchivo/${tabla}/${id}`;

      const formData = new FormData();
      formData.append('imagen', img);//Del Body que se envia desde Postman 

      const resp = await fetch(path,{
        method: 'PUT',
        headers: {
          'utoken': localStorage.getItem('token')||'',
        },
        body: formData,
      });

      const data = await resp.json(); 

      if(data.ok){
        return data.nombreArchivo;
      }else{
        console.log(data.mgs);
        return false;
      }

    } catch (error) {
      
      console.log(error);
      return false;

    }
  }
}
