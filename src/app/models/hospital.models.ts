interface _HospitalUsuario{
    nombre: string,
    _id: string,
    img: string,
}


export class Hospital{
    constructor(
        public nombre: string, 
        public usuario?: _HospitalUsuario,   
        public img?: string,
        public _id?: string,
    ){}
}