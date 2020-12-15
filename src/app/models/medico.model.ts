import { Hospital } from './hospital.models';

interface _MedicoUsuario{
    nombre: string,
    _id: string,
    img: string,
}


export class Medico{

    constructor(    
        public nombre: string, 
        public usuario?: _MedicoUsuario,
        public hospital?: Hospital,   
        public img?: string,
        public _id?: string,
    ){}
}