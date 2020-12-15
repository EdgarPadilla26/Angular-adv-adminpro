import {environment} from '../../environments/environment'

const base_url = environment.base_url;

export class Usuario{

    constructor(
        public nombre: string, 
        public email: string, 
        public password?: string,
        public rol?: string,
        public google?: boolean,
        public img?: string,
        public Uid?: string
    ){}

    get ImagenUrl(){
        /*/subirarchivo/usuarios/noimagen*/

        if(!this.img){
            return `${base_url}/subirarchivo/usuarios/noimagen`;
        }else if(this.img.includes('https')){
            return this.img;
        }
        else if(this.img){
            return `${base_url}/subirarchivo/usuarios/${this.img}`;
        }
        
    };
};


